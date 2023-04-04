import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide username!'],
      minlength: 3,
      maxlength: 30,
    },
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model('User', UserSchema);
