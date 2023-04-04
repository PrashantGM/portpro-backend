import { User } from '../models/User.js';

const createUsersToMongo = async () => {
  try {
    const response = await fetch(
      'https://dummyjson.com/users?select=firstName,lastName,image&limit=10'
    );
    const usersData = await response.json();
    const parseDataForDB = await usersData.users.map((user) => {
      return {
        name: `${user.firstName} ${user.lastName}`,
        profilePic: user.image,
      };
    });
    const users = await User.insertMany(parseDataForDB);
    return users;
  } catch (error) {
    return error.message;
  }
};

export const getUsersFromMongo = async (req, res) => {
  try {
    let users = await User.find();
    if (users.length < 1) {
      users = await createUsersToMongo();
      if (typeof users === 'string') {
        throw new Error(users);
      }
    }
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
