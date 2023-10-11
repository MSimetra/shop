import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { constants } from 'http2';
import { HttpResponse } from "../domain/response";
import { issueJWT, validPassword } from "../utils/utils";

export class UserController {
  private service: UserService;
  private STATUS_OK = constants.HTTP_STATUS_OK;

  constructor() {
    this.service = new UserService();
  }

  async addUser(req: Request, res: Response) {
    req.body.user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.passwordHash,
    }

    await this.service.createUser(req.body.user);
    // const result = await this.service.createUser(req.body.user);
  }

  async getUser(req: Request, res: Response) {
    const user = await this.service.readUser(req.body.username);
    if (!user) {
      return res.status(401).send('<h1>Could not find user</h1>\
      <a href="/login">Try login again</a>')
    }
    const isValid = validPassword(req.body.password, user.password);
    if (isValid) {
      const tokenObject = issueJWT(user);
      res.status(200).send(`<p>You successfully logged in.</p>\
      <p>Use this token to get protected routes access:</p>\
      <p>${tokenObject.token}</p>\
      <form method="POST" action="/login-success">\
      Enter token:<br><input type="text" name="token">\
      <br><br><input type="submit" value="Submit"></form>`);
    } else {
      return res.status(401).send('<h1>You entered the wrong password</h1>\
      <a href="/login">Try login again</a>')
    }
  }

  async changeUser(req: Request, res: Response) {
    await this.service.updateUser(req.body.user);
    res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'user changed'))
  }

  async removeUser(req: Request, res: Response) {
    await this.service.deleteUser(req.body.username);
    res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'user deleted'))
  }
};