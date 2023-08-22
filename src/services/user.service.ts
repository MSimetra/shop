import { knex } from "../models/user.model";

export class UserService {
  createUser(user_name: string, user_email: string, user_password: string) {
    const dbData: any /* Object[]*/ = this.readUser(user_name);

    if (dbData.length === 0) {

      const data = {
        user_name: user_name,
        user_email: user_email,
        user_password: user_password
      }

      knex('users').insert(data);
    }
  }

  readUser(user_name: string) {
    return knex.select().where('user_name', '=', user_name)
  }

  updateUser(user_name: string) {

  }

  deleteUser(user_name: string) {
    knex.select().where('user_name', '=', user_name).del();
  }
}