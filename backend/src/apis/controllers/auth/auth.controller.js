const Services = require("../../services/auth/auth.service");

exports.signUpController = async (req, res) => {
  try {
    const response = await Services.signUp(req.body);
    res
      .status(201)
      .json({
        status: true,
        message: "User registered successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at signUpController`, error);
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

exports.signInController = async (req, res) => {
  try {
    const response = await Services.signIn(req.body);
    res
      .status(200)
      .json({
        status: true,
        message: "User loggedIn successfully!",
        data: response,
      });
  } catch (error) {
    console.log(`Error at signInController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: "Critical internal server error occurred!",
    });
  }
};
