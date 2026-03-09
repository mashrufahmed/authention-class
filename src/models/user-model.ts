import { model, Schema, type Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', userSchema);
export default User;
