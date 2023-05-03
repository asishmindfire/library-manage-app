const Services = require("../../services/books/books.service");

exports.addBookController = async (req, res) => {
  console.log(req.body);
  try {
    const response = await Services.addBook(req.body);
    res
      .status(201)
      .json({
        status: true,
        message: "Book added successfully!",
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

exports.retrieveAllBookController = async (req, res) => {
  try {
    const response = await Services.retrieveAllBook();
    res
      .status(200)
      .json({
        status: true,
        message: "User registered successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at retrieveAllBookController`, error);
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

exports.retrieveBookByIdController = async (req, res) => {
  console.log(req.params.bookId);
  try {
    const response = await Services.retrieveBookById(req.params.bookId);
    res
      .status(200)
      .json({
        status: true,
        message: "Record retrieved successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at retrieveBookByIdController`, error);
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

exports.updateBookByIdController = async (req, res) => {
  console.log(req.params.bookId);
  console.log(req.body);
  try {
    const response = await Services.updateBookById(req.params.bookId, req.body);
    res
      .status(200)
      .json({
        status: true,
        message: "Record updated successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at updateBookByIdController`, error);
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

exports.deleteBookByIdController = async (req, res) => {
  console.log(req.params.bookId);
  try {
    const response = await Services.romoveBookById(req.params.bookId);
    res
      .status(200)
      .json({
        status: true,
        message: "Record deleted successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at deleteBookByIdController`, error);
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
