import { UserInterfaceDB } from "../interfaces/user.interface.db";
import { UserInterface } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

const model = new UserModel();

export class UserService {

  constructor() { }

  async createUser(user: UserInterface): Promise<string | void> {
    await model.createUser(user);
    // const result = await model.createUser(user);
    // return result;
  }

  async readUser(username: string): Promise<UserInterfaceDB> {
    const user = await model.readUser(username);
    return user;
  }

  async readUserByID(username: string): Promise<UserInterfaceDB> {
    const user = await model.readUserByID(username);
    return user;
  }

  async updateUser(user: UserInterface) {
    await model.updateUser(user);
  }

  async deleteUser(username: string): Promise<void> {
    await model.deleteUser(username);
  }
}