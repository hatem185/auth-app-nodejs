import { validationResult } from "express-validator";
async function validationMiddleware(validations) {
  return async (req, res, next) => {
    // Execute each validation check on the request body
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no validation errors, proceed to the next middleware or controller
    next();
  };
}
export default validationMiddleware;
