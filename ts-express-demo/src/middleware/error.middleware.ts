import express, { Request, Response, NextFunction } from 'express';
import HttpException from '../common/http-exception';

//Here, you receive an error of type HttpException and return an appropriate error based on its properties. If error.status and error.message are defined, you include those in the server response. Otherwise, you default to a generic 500 Internal Server Error status code and a generic message.

// It's important to note that you must provide four arguments to identify a function as an error-handling middleware function in Express. You must specify the next object to maintain the error-handling signature even if you don't use it. Otherwise, Express interprets the next object as a regular middleware function, and it won't handle any errors.

// Now, also consider that the condition of a route not existing is not considered an error by Express when you use the framework to build a RESTful API. The REST architecture model uses HTTP status codes to respond to the client. A missing resource should not be an error but a condition you need to report to the client.

//As such, Express won't call your errorHandler middleware function if you request a resource that doesn't exist
export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};
