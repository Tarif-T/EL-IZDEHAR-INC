import { Request, Response } from "express";
import { z } from "zod";
import { storage } from "../storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { ApiResponse, ContactSubmissionResponse } from "../types";

/**
 * Contact form submission controller
 */
export class ContactController {
  /**
   * Create a new contact submission
   */
  static async createContactSubmission(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      const response: ApiResponse<ContactSubmissionResponse> = {
        success: true,
        message: "Contact submission received successfully",
        data: {
          id: submission.id,
          message: "Thank you for your inquiry. We'll get back to you soon!"
        }
      };
      
      res.status(201).json(response);
    } catch (error) {
      ContactController.handleError(error, res);
    }
  }

  /**
   * Get all contact submissions (admin endpoint)
   */
  static async getContactSubmissions(req: Request, res: Response): Promise<void> {
    try {
      const submissions = await storage.getContactSubmissions();
      
      const response: ApiResponse = {
        success: true,
        message: "Contact submissions retrieved successfully",
        data: submissions
      };
      
      res.json(response);
    } catch (error) {
      ContactController.handleError(error, res);
    }
  }

  /**
   * Centralized error handling
   */
  private static handleError(error: unknown, res: Response): void {
    if (error instanceof z.ZodError) {
      const response: ApiResponse = {
        success: false,
        message: "Invalid form data",
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
      res.status(400).json(response);
    } else {
      console.error("Contact controller error:", error);
      const response: ApiResponse = {
        success: false,
        message: "Internal server error"
      };
      res.status(500).json(response);
    }
  }
}