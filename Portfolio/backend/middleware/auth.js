const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret_sanjai_2026');
      req.admin = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired',
        error: 'UNAUTHORIZED'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
      error: 'NO_TOKEN'
    });
  }
};

module.exports = { protect };
