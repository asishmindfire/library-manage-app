const Book = require("../../models/books.model");

module.exports = {
  create: async (data) => {
    const { name, category, price, status } = data;
    return await Book.create({
      name,
      category,
      price: +price,
      status,
    });
  },

  findAll: async () => {
    return await Book.find({});
  },

  findById: async (id) => {
    return await Book.findOne({ _id: id });
  },

  update: async (id, data) => {
    return await Book.updateOne({ _id: id }, data, { upsert: false });
  },

  delete: async (id) => {
    return await Book.findByIdAndRemove(id, { useFindAndModify: false });
  },
};
