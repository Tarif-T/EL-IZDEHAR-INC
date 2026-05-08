import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging
  console.error(`Error ${req.method} ${req.path}:`, err);

  const status = err.status || err.statusCode || 500;
  
  const response: ApiResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  // Add stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.errors = [{ stack: err.stack }];
  }

  res.status(status).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`,
  };
  
  res.status(404).json(response);
};