const BorrowedBooks = require("../../models/borrowedbooks.model");

module.exports = {
  create: async (data) => {
    const { bookId, assignedTo, assignedDt, returnDt, status } = data;
    return await BorrowedBooks.create({
      bookId,
      assignedTo,
      assignedDt,
      returnDt,
      status,
    });
  },

  findById: async (id) => {
    return await BorrowedBooks.findOne({ _id: id });
  },

  findByAssignee: async (id) => {
    return await BorrowedBooks.find({ assignedTo: id }).populate('assignedTo');
  },

  update: async (id, data) => {
    return await BorrowedBooks.updateOne({ _id: id }, data, { upsert: false });
  }
};
