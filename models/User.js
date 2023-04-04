import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide user name!'],
      minlength: 3,
      maxlength: 50,
    },
    profilePic: {
      type: String,
      default: 'profile.png',
    },
  },
  {
    timestamps: true,
  }
);

export const User = model('User', UserSchema);
