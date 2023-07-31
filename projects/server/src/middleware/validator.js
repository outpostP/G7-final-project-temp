const { validationResult, body } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Validation failed", message: errors.array() });
  }
  next();
};

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username cannot contain spaces");
      }
      return true;
    }),

  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    console.log(typeof value);
    console.log(typeof req.body.password);
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password");
    }
    return true;
  }),

  //body file avatar belum
];

const validateUpdateUsername = [
  body("currentUsername")
    .trim()
    .notEmpty()
    .withMessage("currentUsername is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("currentUsername cannot contain spaces");
      }
      return true;
    }),

  body("newUsername")
    .trim()
    .notEmpty()
    .withMessage("newUsername is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("newUsername cannot contain spaces");
      }
      return true;
    }),
];
const validateUpdateEmail = [
  body("currentEmail").trim().isEmail().withMessage("Invalid email format"),

  body("newEmail").trim().isEmail().withMessage("Invalid email format"),
];

// const validateUpdatePassword = [
//   body("currentPassword")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain at least one capital letter")
//     .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
//     .withMessage("Password must contain at least one special character"),

//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain at least one capital letter")
//     .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
//     .withMessage("Password must contain at least one special character"),

//   body("confirmPassword").custom((value, { req }) => {
//     console.log(typeof value);
//     console.log(typeof req.body.password);
//     if (value !== req.body.password) {
//       throw new Error("Confirm password doesn't match the password");
//     }
//     return true;
//   }),
// ];

module.exports = {
  validateRequest,
  validateLogin,
  validateRegistration,
  validateUpdateUsername,
  validateUpdateEmail,
  // validateUpdatePassword,
};
