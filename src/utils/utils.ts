import crypto from 'crypto';
import dotenv from 'dotenv';
import * as env from 'env-var';
import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import { dbUserInterface } from '../interfaces/db.user.interface';

dotenv.config();
const SALT = env.get('SALT').required().asString();

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
// console.log(pathToKey);
// process.exit();
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
// const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

export function validPassword(password: string, passwordHash: string) {
  var hashVerify = crypto.pbkdf2Sync(password, SALT, 10000, 64, 'sha512').toString('hex');
  return hashVerify === passwordHash;
}

export function genPassword(password: string) {
  // const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, SALT, 10000, 64, 'sha512').toString('hex');

  return genHash;
}

export function issueJWT(user: dbUserInterface) {
  const id = user.id;
  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: signedToken,
    expires: expiresIn
  }
}