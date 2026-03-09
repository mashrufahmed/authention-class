import { model, Schema, Types, type Document } from 'mongoose';

interface IPost extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
}

const postSchema = new Schema<IPost>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = model<IPost>('Post', postSchema);
export default Post;
