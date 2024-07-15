import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import generateJwt from '../config/jwt_generator';

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  image:string;
}

interface IUserModel extends Model<IUser> {
  login(email: string, password: string, headers: any): Promise<{ user: IUser; token: string }>;
  comparePassword(user: IUser, password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
});

UserSchema.statics.login = async function (email: string, password: string, headers: any) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = await generateJwt(user);
      return { user, token };
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

UserSchema.statics.comparePassword = async function (user: IUser, password: string) {
  const auth = await bcrypt.compare(password, user.password);
  return auth;
};

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);
export default User;
