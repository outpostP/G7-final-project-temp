const { validationResult, body } = require('express-validator');
 
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validatePasswordChange = [
  body('oldPassword').exists().withMessage('Old password is required'),
  body('newPassword')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/).withMessage('Password must contain at least one special character'),
  body('confirmNewPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Confirm password does not match the new password');
    }
    return true;
  }),
];
 
const validateEmail = [
  body('email')
    .trim()  
    .isEmail().withMessage('Invalid email format')
];

const validateContent = [
  body('content')
    .trim()  
    .isLength({ max: 500 }).withMessage('Content must not exceed 500 characters'),

    body('title')
    .trim() 
    .isLength({ max: 150 }).withMessage('Title must not exceed 150 characters')
];

const validateUsername = [
  body('username')
    .trim() 
    .notEmpty().withMessage('Username is required')
    .custom((value) => {
      if (value.includes(' ')) {
        throw new Error('Username cannot contain spaces');
      }
      return true;
    }),
];

const validatePhone = [
  body('phone')
    .trim() 
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d+$/).withMessage('Phone number must contain only numbers')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),
];

const validateRegister = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email format'),

  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .custom((value) => {
      if (value.includes(' ')) {
        throw new Error('Username cannot contain spaces');
      }
      return true;
    }),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d+$/).withMessage('Phone number must contain only numbers')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/).withMessage('Password must contain at least one special character'),
];

const validateLogin = [
  body('email')
    .optional({ nullable: true }) 
    .trim()
    .isEmail().withMessage('Invalid email format'),

  body('username')
    .optional({ nullable: true }) 
    .trim()
    .notEmpty().withMessage('Username is required')
    .custom((value) => {
      if (value && value.includes(' ')) { 
        throw new Error('Username cannot contain spaces');
      }
      return true;
    }),

  body('phone')
    .optional({ nullable: true }) 
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d+$/).withMessage('Phone number must contain only numbers')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/).withMessage('Password must contain at least one special character'),
];

const validatePasswordReset = [
  body('newPassword')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/).withMessage('Password must contain at least one special character'),
  body('confirmNewPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Confirm password does not match the new password');
    }
    return true;
  }),
];

module.exports = {
  validateRequest,
  validatePasswordChange,
  validateEmail,
  validateContent,
  validateUsername,
  validatePhone,
  validateRegister,
  validateLogin,
  validatePasswordReset
};
