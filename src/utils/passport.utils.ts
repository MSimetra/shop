import fs from 'fs';
import path from 'path';
import { PassportStatic } from "passport";
import { payloadInterface } from '../interfaces/payload.interface';
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { UserService } from '../services/user.service';

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const userService = new UserService();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

export const applyPassportStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (payload: payloadInterface, done: VerifiedCallback) => {
      try {
        if (payload.sub) {
          const result = await userService.readUserByID(payload.sub);
          console.log(result);
          return done(null, result);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
