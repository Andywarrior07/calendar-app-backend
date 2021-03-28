const { Router } = require('express');
const { check } = require('express-validator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/customValidator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRequest } = require('../middlewares/validate-request');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'start is required').custom(isDate),
    check('end', 'end is required').custom(isDate),
    validateRequest,
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'start is required').custom(isDate),
    check('end', 'end is required').custom(isDate),
    validateRequest,
  ],
  updateEvent
);

router.delete('/:id', [check(), validateRequest], deleteEvent);

module.exports = router;
