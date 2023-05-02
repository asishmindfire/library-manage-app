const { User } = require("../../models/users.model");

module.exports = {
  create: async (data) => {
    const { username, password, role } = data;
    return await User.create({
      username,
      password,
      role,
    });
  },

  findUserByName: async (username) => {
    return await User.findOne({ username });
  },
};
