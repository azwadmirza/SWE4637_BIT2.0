import mongoose, { Document, Model, Schema } from 'mongoose';

interface IOtp extends Document {
  email: string;
  otp: string;
}

const OTPSchema: Schema<IOtp> = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  }
});

const Otp: Model<IOtp> = mongoose.model<IOtp>('Otp', OTPSchema);
export default Otp;
