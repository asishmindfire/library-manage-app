const userRepository = require("../../repositories/user.repository");
const borrowBooksRepository = require("../../repositories/borrowedBooks.repository");

exports.findAllStudents = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const students = await userRepository.findAllStudents();
      if (students.length > 0) {
        return resolve(students);
      }
      resolve([]);
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.borrowBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      data.assignedDt = new Date();
      data.returnDt = new Date();
      data.status = true;
      const borrowedBook = await borrowBooksRepository.create(data);
      if (borrowedBook._id) {
        return resolve(borrowedBook);
      }
      reject({ status: 1, statusCode: 400, message: "Bad request" });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.returnBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const book = await borrowBooksRepository.findById(id);
      console.log(`book`, book);
      if (!book) {
        return reject({
          status: 1,
          statusCode: 404,
          message: "Record not found!",
        });
      }
      if (!book.status) {
        reject({ status: 1, statusCode: 409, message: "You had already returned this book." });
      }
      const returnBook = await borrowBooksRepository.update(id, {
        returnDt: new Date(),
        status: false,
      });
      if (returnBook.acknowledged && returnBook.modifiedCount === 1) {
        return resolve(returnBook);
      }
      reject({ status: 1, statusCode: 400, message: "Bad request" });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

exports.findAllAssignedBooks = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const books = await borrowBooksRepository.findByAssignee(id);
      if (books.length > 0) {
        return resolve(books);
      }
      resolve([]);
    } catch (error) {
      reject({ message: error.message });
    }
  });
};
