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
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, user) {
    delete user._id;
    return { id: user.id, ...user };
  },
});
module.exports = model('User', UserSchema);
