const bcrypt = require("bcrypt");
const userRepository = require("../../repositories/user.repository");
const jwt = require("jsonwebtoken");

exports.signUp = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password, role } = request;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const userToBeCreated = await userRepository.create({
        username,
        password: hashedPassword,
        role,
      });
      if (userToBeCreated._id) {
        return resolve(this.omitPassword(userToBeCreated));
      }
      reject({ status: 1, statusCode: 400, message: "User creation failed!" });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.signIn = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = request;
      const user = await userRepository.findUserByName(username);
      if (!user) {
        return reject({
          status: 1,
          statusCode: 404,
          message: "User Not found.",
        });
      }

      var passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return reject({
          status: 1,
          statusCode: 401,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          roles: user.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h", // 86400 // 24 hours
        }
      );
      resolve({
        id: user._id,
        username: user.username,
        roles: user.role,
        token,
      });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.omitPassword = (data) => {
  const newData = JSON.parse(JSON.stringify(data));
  const { password, __v, ...filteredData } = newData;
  return filteredData;
};
