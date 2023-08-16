import { Request, Response } from "express";
import { UserService } from "../servises/user.service";
import {constants} from 'http2';
import { HttpResponse } from "../domain/response";

export class UserController {
  private service = new UserService();
  
  userRegistration(req: Request, res: Response) {
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  }
};