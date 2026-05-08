import { 
  users, 
  contactSubmissions, 
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, count } from "drizzle-orm";

/**
 * Storage interface defining all database operations
 */
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(options?: PaginationOptions): Promise<PaginatedResult<ContactSubmission>>;
  getContactSubmissionById(id: string): Promise<ContactSubmission | undefined>;
  searchContactSubmissions(query: string, options?: PaginationOptions): Promise<PaginatedResult<ContactSubmission>>;
}

/**
 * Pagination options for database queries
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated query result
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Database storage implementation using Drizzle ORM
 */
export class DatabaseStorage implements IStorage {
  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user");
    }
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);
      return user;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw new Error("Failed to fetch user");
    }
  }

  /**
   * Create a new user
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  /**
   * Create a new contact submission
   */
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    try {
      const [submission] = await db
        .insert(contactSubmissions)
        .values(insertSubmission)
        .returning();
      return submission;
    } catch (error) {
      console.error("Error creating contact submission:", error);
      throw new Error("Failed to create contact submission");
    }
  }

  /**
   * Get contact submissions with pagination
   */
  async getContactSubmissions(options: PaginationOptions = {}): Promise<PaginatedResult<ContactSubmission>> {
    try {
      const { 
        page = 1, 
        limit = 20, 
        sortBy = 'createdAt', 
        sortOrder = 'desc' 
      } = options;

      const offset = (page - 1) * limit;

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(contactSubmissions);

      // Get paginated data
      const data = await db
        .select()
        .from(contactSubmissions)
        .orderBy(sortOrder === 'desc' ? desc(contactSubmissions.createdAt) : contactSubmissions.createdAt)
        .limit(limit)
        .offset(offset);

      return {
        data,
        pagination: {
          page,
          limit,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      throw new Error("Failed to fetch contact submissions");
    }
  }

  /**
   * Get contact submission by ID
   */
  async getContactSubmissionById(id: string): Promise<ContactSubmission | undefined> {
    try {
      const [submission] = await db
        .select()
        .from(contactSubmissions)
        .where(eq(contactSubmissions.id, id))
        .limit(1);
      return submission;
    } catch (error) {
      console.error("Error fetching contact submission by ID:", error);
      throw new Error("Failed to fetch contact submission");
    }
  }

  /**
   * Search contact submissions
   */
  async searchContactSubmissions(
    query: string, 
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<ContactSubmission>> {
    try {
      const { 
        page = 1, 
        limit = 20, 
        sortBy = 'createdAt', 
        sortOrder = 'desc' 
      } = options;

      const offset = (page - 1) * limit;
      const searchQuery = `%${query}%`;

      const whereClause = and(
        ilike(contactSubmissions.firstName, searchQuery),
        ilike(contactSubmissions.lastName, searchQuery),
        ilike(contactSubmissions.email, searchQuery),
        ilike(contactSubmissions.message, searchQuery)
      );

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(contactSubmissions)
        .where(whereClause);

      // Get paginated data
      const data = await db
        .select()
        .from(contactSubmissions)
        .where(whereClause)
        .orderBy(sortOrder === 'desc' ? desc(contactSubmissions.createdAt) : contactSubmissions.createdAt)
        .limit(limit)
        .offset(offset);

      return {
        data,
        pagination: {
          page,
          limit,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / limit),
        },
      };
    } catch (error) {
      console.error("Error searching contact submissions:", error);
      throw new Error("Failed to search contact submissions");
    }
  }
}

// Export singleton instance
export const storage = new DatabaseStorage();
