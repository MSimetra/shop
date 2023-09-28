import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { constants } from 'http2';
import { HttpResponse } from "../domain/response";
import { UserInterface } from "../interfaces/user.interface";


export class UserController {
  private service: UserService;
  private STATUS_OK = constants.HTTP_STATUS_OK;
  
  constructor() {
    this.service = new UserService();
  }

  async addUser(req: Request, res: Response) {
    const result = await this.service.createUser(req.body.user);
    if (!result) {
      res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'user created'))
    } else {
      res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, result))
    }
  }
  
  async getUser(req: Request, res: Response) {
    const user = await this.service.readUser(req.body.user_name);
    res.status(this.STATUS_OK).send(user)
  }
  
  async changeUser(req: Request, res: Response) {
    await this.service.updateUser(req.body.user);
    res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'user changed'))
  }

  async removeUser(req: Request, res: Response) {
    await this.service.deleteUser(req.body.user_name);
    res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'user deleted'))
  }

  // async userRegistration(req: Request, res: Response) {
  //   res.status(constants.HTTP_STATUS_OK).send(new HttpResponse(constants.HTTP_STATUS_OK, 'NOT IMPLEMENTED: user registration'))
  // }
};