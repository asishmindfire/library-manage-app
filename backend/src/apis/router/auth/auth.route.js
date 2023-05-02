const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const verifySignUp = require("../../middlewares/verify.signup");
const { ROLES } = require("../../../models/users.model");
const { validate } = require("../../middlewares/request.validation");
const { signUpController, signInController } = require("../../controllers/auth/auth.controller");

router.post(
  "/signup",
  [
    body("username")
      .isString()
      .withMessage("Username should be string!")
      .notEmpty()
      .withMessage("Username is mandatory!"),

    body("password")
      .isString()
      .withMessage("Password should be string!")
      .notEmpty()
      .withMessage("password is mandatory!"),

    body("role")
      .isIn(ROLES)
      .withMessage("Please input a valid User Role. (Ex- Admin/Student)"),
  ],
  validate,
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted,
  signUpController
);



router.post(
  "/signin",
  [
    body("username")
      .isString()
      .withMessage("Username should be string!")
      .notEmpty()
      .withMessage("Username is mandatory!"),

    body("password")
      .isString()
      .withMessage("Password should be string!")
      .notEmpty()
      .withMessage("password is mandatory!"),
  ],
  validate,
  signInController
);

module.exports = router;
