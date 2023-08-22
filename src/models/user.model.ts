import Knex from "knex";
import { config } from "../config/db.config";

export const knex = Knex(config);