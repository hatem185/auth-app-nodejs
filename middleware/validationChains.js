import { body } from "express-validator";

const validationRegisterChains = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}|(?=.*\d)[\d]{6,}$/
    )
    .withMessage(
      "Password must contain at least 6 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
    ),
];
const validationLoginChains = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export { validationRegisterChains, validationLoginChains };
