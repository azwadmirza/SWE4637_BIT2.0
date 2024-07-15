import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../model/users.model';
import dotenv from 'dotenv';

dotenv.config();

export const initialize = () => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env._SECRET_KEY || '',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (payload:any, done:any) => {
        try {
          const user = await User.findById(payload.sub);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user: any, done:any) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done:any) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  return passport;
};


