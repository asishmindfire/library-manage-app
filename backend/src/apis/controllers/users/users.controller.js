const Services = require("../../services/users/users.service");

exports.findAllStudentsController = async (req, res) => {
  try {
    const response = await Services.findAllStudents();
    res
      .status(200)
      .json({
        status: true,
        message: "Records retrieved successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at addBookController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.BorrowBooksController = async (req, res) => {
  console.log(req.body);
  try {
    const response = await Services.borrowBook(req.body);
    res
      .status(200)
      .json({
        status: true,
        message: "Book borrowed successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at addBookController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.returnBookController = async (req, res) => {
  console.log(req.params.borrwedBookId);
  try {
    const response = await Services.returnBook(req.params.borrwedBookId);
    res
      .status(200)
      .json({
        status: true,
        message: "Book returned successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at returnBookController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.findAllAssignedBooksController = async (req, res) => {
  console.log(req.params.userId);
  try {
    const response = await Services.findAllAssignedBooks(req.params.userId);
    res
      .status(200)
      .json({
        status: true,
        message: "Records retrieved successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at returnBookController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};