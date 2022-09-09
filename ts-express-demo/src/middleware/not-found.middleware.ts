import { Request, Response, NextFunction } from 'express';

// this is a customized error for 404 responses
export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = 'Resource not found';

  response.status(404).send(message);
};
