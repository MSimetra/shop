import { UserInterface } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

const model = new UserModel();

export class UserService {
  async createUser(user: UserInterface): Promise<string | void> {
    const result = await model.createUser(user);
    return result;
  }

  async readUser(user_name: string): Promise<UserInterface[] | string> {
    const user = await model.readUser(user_name);
    return user;
  }

  async updateUser(user: UserInterface) {
    await model.updateUser(user);
  }

  async deleteUser(user_name: string): Promise<void> {
    await model.deleteUser(user_name);
  }
}