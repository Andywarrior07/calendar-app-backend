const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRequest } = require('../middlewares/validate-request');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be greater than 5 characters').isLength({
      min: 6,
    }),
    validateRequest,
  ],
  createUser
);

router.post(
  '/signin',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateRequest,
  ],
  loginUser
);

router.get('/renew', [validateJWT], renewToken);

module.exports = router;
