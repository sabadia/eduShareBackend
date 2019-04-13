const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'more-long-more-better-secret');
    req.userData = {
      username: decodedToken.username,
      userId: decodedToken.userId
    };
    next();
  } catch {
    res.status(401).json({ message: 'auth failed' });
  }
};
