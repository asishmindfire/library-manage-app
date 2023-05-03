const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  findAllStudentsController,
  BorrowBooksController,
  returnBookController,
  findAllAssignedBooksController,
} = require("../../controllers/users/users.controller");

router.get("/", findAllStudentsController);

router.post(
  "/borrow",
  [
    body("bookId")
      .isString()
      .withMessage("bookId should be a string!")
      .notEmpty()
      .withMessage("bookId is mandatory!"),

    body("assignedTo")
      .isString()
      .withMessage("assignedTo should be a string!")
      .notEmpty()
      .withMessage("assignedTo is mandatory!"),
  ],
  BorrowBooksController
);

router.put("/return/:borrwedBookId", returnBookController);

router.get("/:userId", findAllAssignedBooksController);

module.exports = router;
