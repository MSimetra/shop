import Knex from "knex";
import { config } from "../config/db.config";
import { UserInterface } from "../interfaces/user.interface";
import { UserInterfaceDB } from "../interfaces/user.interface.db";

export const knex = Knex(config);

export class UserModel {

  constructor() { }

  async createUser(user: UserInterface): Promise<string | void> {
    await knex('users').insert(user);
  }

  async readUser(username: string): Promise<UserInterfaceDB> {
    const user = await knex.select().from('users').where('username', '=', username)
    const result = user[0];
    return result;
  }

  async readUserByID(id: string): Promise<UserInterfaceDB> {
    const user = await knex.select().from('users').where('id', '=', id)
    const result = user[0];
    return result;
  }

  async updateUser(user: UserInterface): Promise<void> {
    await knex('users').update(user).where('username', '=', user.username)
  }

  async deleteUser(username: string): Promise<void> {
    await knex.select().from('users').where('username', '=', username).del();
  }
}