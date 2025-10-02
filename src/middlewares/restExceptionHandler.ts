import { Request, Response, NextFunction } from "express";
import { EmailAlreadyTakenException } from "../exceptions/EmailAlreadyTakenException";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import {ResourceNotFoundException} from "../exceptions/ResourceNotFoundException";

export function restExceptionHandler(err: any, request: Request, response: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal server error";

  switch (true) {
    case err instanceof EmailAlreadyTakenException:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof UserNotFoundException:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof ResourceNotFoundException:
      statusCode = err.statusCode;
      message = err.message;
      break;


    default:
      console.log("Error: ", err);
      break;
  }

  response.status(statusCode).json({ error: message });
}
