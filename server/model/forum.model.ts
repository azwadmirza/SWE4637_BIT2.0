import mongoose, { Document, Schema, model } from 'mongoose';

export interface IForum extends Document {
  user: mongoose.Schema.Types.ObjectId;
  question: string;
  answer: string;
  timestamp: Date;
}

const ForumSchema: Schema<IForum> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Forum: mongoose.Model<IForum> = model<IForum>('Forum', ForumSchema);
export default Forum;
