import { User } from '../models/User.js';

export const createUsersToMongo = async (req, res) => {
  try {
    const { name, profilePic } = req.body;
    const user = await User.create({
      name,
      profilePic,
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: error });
  }
};
export const getUsersFromMongo = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'Something went wrong! Please try again.' });
  }
};
