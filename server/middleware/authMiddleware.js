const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save User ID in Request
      req.user = {
        id: decoded.id,
      };

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, No Token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protect;