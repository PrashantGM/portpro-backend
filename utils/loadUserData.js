const getDummyUserData = async () => {
  try {
    const response = await fetch(
      'https://dummyjson.com/users?select=firstName,lastName,image&limit=20'
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

const insertToCassandra = async (models, User) => {
  let queries = [];
  const parseDataForDB = await getDummyUserData();

  for (const user of parseDataForDB) {
    const userInstance = new User(user);
    const insertUser = userInstance.save({ return_query: true });
    queries.push(insertUser);
  }
  await models.doBatchAsync(queries);
};

const insertToMongo = async (User) => {
  const parseDataForDB = await getDummyUserData();
  await User.insertMany(parseDataForDB);
};
module.exports = { getDummyUserData, insertToCassandra, insertToMongo };
