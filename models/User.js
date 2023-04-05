const { Schema, model } = require('mongoose');

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

module.exports = model('User', UserSchema);
