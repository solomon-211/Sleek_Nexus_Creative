const { v4: uuidv4 } = require('uuid');

const requestContext = (req, res, next) => {
  const incomingId = req.headers['x-request-id'];
  req.requestId = typeof incomingId === 'string' && incomingId.trim() ? incomingId.trim() : uuidv4();
  res.setHeader('X-Request-Id', req.requestId);
  next();
};

module.exports = { requestContext };
