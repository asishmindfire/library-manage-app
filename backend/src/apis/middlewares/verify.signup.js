const { ROLES } = require("../../models/users.model");
const userRepository = require("../repositories/user.repository");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const isUsernameExist = await userRepository.findUserByName(
      req.body.username
    );
    if (isUsernameExist) {
      res.status(409).json({
        status: false,
        message: "Failed! Username is already in use!",
      });
      return;
    }
    next();
  } catch (error) {
    console.log(`Error at checkDuplicateUsernameOrEmail`, error);
    res.status(500).json({
      status: false,
      message: "Critical internal server error occurred!",
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          status: false,
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
