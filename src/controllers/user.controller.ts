import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import {constants} from 'http2';
import { HttpResponse } from "../domain/response";

export class UserController {
  private service = new UserService();

  addUser(req: Request, res: Response) {
    this.service.createUser(req.body.user_name, req.body.user_email, req.body.user_password);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'user created'))
  }

  getUser(req: Request, res: Response) {
    this.service.readUser(req.body.user_name);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  }

  changeUser(req: Request, res: Response) {
    this.service.readUser(req.body.user_name);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  }

  removeUser(req: Request, res: Response) {
    this.service.deleteUser(req.body.user_name);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  }

  userRegistration(req: Request, res: Response) {
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  }
};