import mongoose, { Schema, Document, Types } from 'mongoose';

interface IComment {
  user: Types.ObjectId | IUser;
  content: string;
  timestamp: Date;
  upvotes: Types.ObjectId[] | IUser[];
  downvotes: Types.ObjectId[] | IUser[];
  totalUpvotes: number;
  totalDownvotes: number;
}

interface IPost {
  user: Types.ObjectId | IUser;
  content: string;
  timestamp: Date;
  attachment?: string;
  comments: IComment[];
  upvotes: Types.ObjectId[] | IUser[];
  downvotes: Types.ObjectId[] | IUser[];
  totalUpvotes: number;
  totalDownvotes: number;
}

export interface IGroup extends Document {
  name: string;
  creator: Types.ObjectId | IUser;
  posts: IPost[];
  upvote(postId: Types.ObjectId, userId: Types.ObjectId): Promise<void>;
  downvote(postId: Types.ObjectId, userId: Types.ObjectId): Promise<void>;
    upvoteComment(postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId): Promise<void>;
    downvoteComment(postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId): Promise<void>;
}

const commentSchema: Schema<IComment> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalUpvotes: { type: Number, default: 0 },
  totalDownvotes: { type: Number, default: 0 }
});

const postSchema: Schema<IPost> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  attachment: { type: String },
  comments: [commentSchema],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalUpvotes: { type: Number, default: 0 },
  totalDownvotes: { type: Number, default: 0 }
});

const groupSchema: Schema<IGroup> = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  posts: [postSchema]
});


groupSchema.statics.upvote = async function (postId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
  await this.updateOne(
    { 'posts._id': postId },
    {
      $addToSet: { 'posts.$.upvotes': userId },
      $inc: { 'posts.$.totalUpvotes': 1 }
    }
  );
};

groupSchema.statics.downvote = async function (postId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    await this.updateOne(
      { 'posts._id': postId },
      {
        $addToSet: { 'posts.$.downvotes': userId },
        $inc: { 'posts.$.totalDownvotes': 1 }
      }
    );
  };

  groupSchema.statics.upvoteComment= async function (postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    await this.updateOne(
      { 'posts._id': postId, 'posts.comments._id': commentId },
        {
            $addToSet: { 'posts.$.comments.$.upvotes': userId },
            $inc: { 'posts.$.comments.$.totalUpvotes': 1 }
        }
    );
}


groupSchema.statics.downvoteComment = async function (postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    await this.updateOne(
        {
            'posts._id': postId,
            'posts.comments._id': commentId
        },
        {
            $addToSet: { 'posts.$.comments.$.downvotes': userId },
            $inc: { 'posts.$.comments.$.totalDownvotes': 1 }
        }
    );
}

interface IUser {
  _id: string;
}

const Group = mongoose.model<IGroup>('Group', groupSchema);

export default Group;
