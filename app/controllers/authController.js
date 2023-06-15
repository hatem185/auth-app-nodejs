import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { config } from "dotenv";
config();
const JWT_SECRET = process.env.JWT_SECRET;

// User registration
async function registerUser(req, res) {
  try {
    // // Validate request body using express-validator middleware
    // await Promise.all(validationMiddleware());

    // // Check for validation errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // Extract user details from request body
    const { username, fullname, email, password, phoneNumber } = req.body;

    // Check if the user username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this username is already exists" });
    }
    // Check if the user email already exists
    user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email is already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    user = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the user to the database
    await user.save();

    // Generate a token
    const token = generateToken(user);

    // Send the response with token
    return res.status(201).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
}

// User login
async function loginUser(req, res) {
  try {
    // // Validate request body using express-validator middleware
    // await Promise.all(validationMiddleware());

    // // Check for validation errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // Extract login credentials from request body
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // Generate a token
    const token = generateToken(user);

    // Send the response with token
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

// User logout
async function logoutUser(_req, res) {
  try {
    // Perform any necessary logout operations
    // ...

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging out" });
  }
}

// Helper function to generate token
function generateToken(user) {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
}

export { registerUser, loginUser, logoutUser };
