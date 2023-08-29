import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { constants } from 'http2';
import { HttpResponse } from "../domain/response";
import { UserInterface } from "../interfaces/user.interface";


const service = new UserService();

export class UserController {
  // public STATUS_OK = constants.HTTP_STATUS_OK;

  async addUser(req: Request, res: Response) {
    const result = await service.createUser(req.body.user);
    if (!result) {
      res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'user created'))
    } else {
      res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, result))
    }
  }

  async getUser(req: Request, res: Response) {
    const user = await service.readUser(req.body.user_name);
    res.status(constants.HTTP_STATUS_OK).send(user)
  }

  async changeUser(req: Request, res: Response) {
    await service.updateUser(req.body.user);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'user changed'))
  }

  async removeUser(req: Request, res: Response) {
    await service.deleteUser(req.body.user_name);
    res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'user deleted'))
  }

  // async userRegistration(req: Request, res: Response) {
  //   res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  // }
};