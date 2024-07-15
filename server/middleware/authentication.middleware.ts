import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { initialize } from '../config/passport';
initialize();

const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err:any, user:any, info:any) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticated;
