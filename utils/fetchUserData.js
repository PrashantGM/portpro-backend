module.exports = async () => {
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
    return parseDataForDB;
  } catch (error) {
    console.log(error);
  }
};
