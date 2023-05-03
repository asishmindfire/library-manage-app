const bookRepository = require("../../repositories/books.repository");

exports.addBook = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, category, price, status } = request;
      const bookToBeCreated = await bookRepository.create({
        name,
        category,
        price,
        status,
      });
      if (bookToBeCreated._id) {
        return resolve(bookToBeCreated);
      }
      reject({ status: 1, statusCode: 400, message: "Book addition failed!" });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.retrieveAllBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await bookRepository.findAll();
      if (books && books.length >= 0) {
        return resolve(books);
      }
      reject({
        status: 1,
        statusCode: 400,
        message: "Unable to retrieve books.",
      });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.retrieveBookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await bookRepository.findById(id);
      if (!books) {
        reject({
          status: 1,
          statusCode: 404,
          message: "Record Not found",
        });
      }
      return resolve(books);
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.updateBookById = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await bookRepository.update(id, data);
      console.log(books);
      if (books.acknowledged && books.modifiedCount === 1) {
        return resolve(books);
      }
      reject({
        status: 1,
        statusCode: 404,
        message: "Record Not found",
      });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.romoveBookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await bookRepository.delete(id);
      if (!books) {
        reject({
          status: 1,
          statusCode: 404,
          message: "Record Not found",
        });
      }
      return resolve(books);
    } catch (error) {
      reject({ message: error.message });
    }
  });
};
