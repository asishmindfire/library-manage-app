const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BorrowedBookSchema = new Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    assignedDt: {
      type: Date,
      required: true,
    },
    returnDt: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("borrowedbooks", BorrowedBookSchema);
