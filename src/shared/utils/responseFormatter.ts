import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  statusCode: number;
  details?: string[];
}

interface PaginatedResponse extends ApiResponse {
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const formatSuccess = (
  res: Response,
  data: any = null,
  message: string = 'Operación exitosa',
  statusCode: number = 200
): void => {
  const response: ApiResponse = {
    success: true,
    data,
    message,
    statusCode,
  };
  res.status(statusCode).json(response);
};

export const formatPaginated = (
  res: Response,
  data: any[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
  message: string = 'Operación exitosa'
): void => {
  const response: PaginatedResponse = {
    success: true,
    data,
    message,
    statusCode: 200,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
  res.status(200).json(response);
};

export const formatError = (
  res: Response,
  error: string,
  statusCode: number = 500,
  details?: string[]
): void => {
  const response: ApiResponse = {
    success: false,
    error,
    statusCode,
    details,
  };
  res.status(statusCode).json(response);
};