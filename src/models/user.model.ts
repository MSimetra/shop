import Knex from "knex";
import { config } from "../config/db.config";
import { UserInterface } from "../interfaces/user.interface";

export const knex = Knex(config);

export class UserModel {
  async createUser(user: UserInterface): Promise<string | void> {
    const result = await this.readUser(user.user_name);
    if (result !== 'user does not exists') {
      return 'user already exists';
    }
    await knex('users').insert(user);
  }

  async readUser(user_name: string): Promise<UserInterface[] | string> {
    const result = await knex.select().from('users').where('user_name', '=', user_name)
    if (result.length === 0) {
      return 'user does not exists'
    };
    return result;
  }

  async updateUser(user: UserInterface): Promise<void> {
    await knex('users').update(user).where('user_name', '=', user.user_name)
  }

  async deleteUser(user_name: string): Promise<void> {
    await knex.select().from('users').where('user_name', '=', user_name).del();
  }
}

