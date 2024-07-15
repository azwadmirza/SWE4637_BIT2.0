import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import passport from 'passport';
import generateJwt from '../config/jwt_generator';
import SMTPClient from '../config/smtp';
import User from '../model/users.model';
import Otp from '../model/otp.model';

dotenv.config();
// import { passport_config } from '../config/passport';

const checkExistingUser = async (user: { email: string }) => {
  try {
    const newuser = await User.findOne({ email: user.email });
    return !newuser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (!(await checkExistingUser(user))) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      const newUser = {
        username: user.username,
        email: user.email,
        password: hash
      };
      const createdUser = await User.create(newUser);
      const token = await generateJwt(createdUser);
      res.status(200).json({ message: "User created successfully", token, user: createdUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password, req.headers);
    res.status(200).json({ status: "success", message: "Logged in successfully", ...user });
  } catch (error) {
    console.log(error);
    if (error === "Incorrect password" || error === "Incorrect email") {
      res.status(401).json({ error: error });
    } else {
      res.status(500).json({ error: error });
    }
  }
};

const validateUser = async (req: Request, res: Response) => {
  passport.authenticate('jwt', { session: false }, (err:any, user:any, info:any) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      return res.status(200).json({ status: "success", message: "User is authenticated" });
    }
  })(req, res);
};

const getUser = async (req: Request, res: Response) => {
  passport.authenticate('jwt', { session: false }, (err:any, user:any) => {
    if (err || !user) {
      return res.status(401).json({ status: "error", message: 'Unauthorized' });
    } else {
      return res.status(200).json({ status: "success", message: "User is authenticated", user });
    }
  })(req, res);
};


const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;
    const otpDoc = await Otp.findOne({ email, otp });
    if (otpDoc) {
      const user = await User.findOne({ email });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        await user.save();
        await Otp.findOneAndDelete({ email, otp });
        return res.status(200).json({ status: "success", message: "Password reset successfully" });
      }
    } else {
      return res.status(400).json({ status: "error", message: "Invalid otp" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, status: "error", message: "Internal Server Error" });
  }
};

export const getUserByEmail = async (request:Request,response:Response) => {
    try {
        const {email}=request.body;
        const user = await User
            .findOne({ email });
        if (user) {
            response.status(200).json({ status: "success", message: "User found", user });
        }
        else {
            response.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ status: "error", error: error });
    }
}

const updateUserProfile = async (req: Request, res: Response) => {
    try {
      const { userId, username, email, password, newPassword } = req.body;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
  
      if (password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ status: "error", message: "Incorrect password" });
        }
      }
  
      if (username) {
        user.username = username;
      }
  
      if (email) {
        if (!(await checkExistingUser(email))) {
          return res.status(400).json({ status: "error", message: "Email already exists" });
        }
        user.email = email;
      }
  
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
  
      await user.save();
      res.status(200).json({ status: "success", message: "Profile updated successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: error, message: "Internal Server Error" });
    }
  };

export {
  register,
  login,
  validateUser,
  getUser,
  resetPassword,
  updateUserProfile
};
