'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Authorization: Bearer HASH_TOKEN
  const [authType, token] = authHeader.split(/\s/);

  if (authType !== 'Bearer' || !token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;

  next();
};
