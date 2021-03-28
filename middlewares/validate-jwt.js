const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Unathorized',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);

    req.user = { uid, name };
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: 'Unathorized',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
