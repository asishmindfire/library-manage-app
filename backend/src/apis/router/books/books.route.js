const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validate } = require("../../middlewares/request.validation");
const {
  addBookController,
  retrieveAllBookController,
  retrieveBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
} = require("../../controllers/books/books.controller");

router.post(
  "/",
  [
    body("name")
      .isString()
      .withMessage("Book name should be a string!")
      .notEmpty()
      .withMessage("Book name is mandatory!"),

    body("category")
      .isString()
      .withMessage("Category should be a string!")
      .notEmpty()
      .withMessage("Category is mandatory!"),

    body("price")
      .notEmpty()
      .withMessage("Price is mandatory!")
      .custom((bodyValue) => {
        var regex = /^\d+(\.\d{1,2})?$/;
        if (regex.test(bodyValue)) {
          return true;
        }
        throw new Error("Please input a valid price");
      }),

    body("status").notEmpty().withMessage("Status is mandatory!"),
  ],
  validate,
  addBookController
);

router.get("/", retrieveAllBookController);

router.get("/:bookId", retrieveBookByIdController);

router.put("/:bookId", updateBookByIdController);

router.delete("/:bookId", deleteBookByIdController);

module.exports = router;
