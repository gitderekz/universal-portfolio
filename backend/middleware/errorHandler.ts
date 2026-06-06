import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: any;
  stack?: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  const response: ErrorResponse = {
    success: false,
    message: error.message || 'Server Error'
  };

  // Mongoose/Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    response.message = 'Validation Error';
    response.errors = err.errors?.map((e: any) => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(response);
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    response.message = 'Duplicate field value entered';
    response.errors = err.errors?.map((e: any) => ({
      field: e.path,
      message: `${e.path} already exists`
    }));
    return res.status(400).json(response);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    response.message = 'Invalid token';
    return res.status(401).json(response);
  }

  if (err.name === 'TokenExpiredError') {
    response.message = 'Token expired';
    return res.status(401).json(response);
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(error.statusCode || 500).json(response);
};
