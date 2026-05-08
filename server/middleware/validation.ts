import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiResponse } from "../types";

/**
 * Middleware for request validation using Zod schemas
 */
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const response: ApiResponse = {
          success: false,
          message: "Validation error",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        };
        res.status(400).json(response);
      } else {
        next(error);
      }
    }
  };
};

/**
 * Request body validation schemas
 */
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export const contactValidationSchema = z.object({
  body: insertContactSubmissionSchema,
});