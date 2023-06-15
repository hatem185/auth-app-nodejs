import User from "../models/user.js";

// Get user details
async function getUser(req, res) {
  try {
    const userId = req.params.id;

    // Find the user in the database by ID
    const user = await User.findById(userId);

    if (!user) {
      // User not found
      res.status(404).json({ error: "User not found" });
    } else {
      // User found, send the user details in the response
      res.status(200).json({ user });
    }
  } catch (error) {
    // Error occurred while finding user
    res.status(500).json({ error: "An error occurred while finding user" });
  }
}

// Update user information
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      // User not found
      res.status(404).json({ error: "User not found" });
    } else {
      // User updated successfully, send the updated user details in the response
      res.status(200).json({ user: updatedUser });
    }
  } catch (error) {
    // Error occurred while updating user
    res.status(500).json({ error: "An error occurred while updating user" });
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      // User not found
      res.status(404).json({ error: "User not found" });
    } else {
      // User deleted successfully, send a success response
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    // Error occurred while deleting user
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
}

export { getUser, updateUser, deleteUser };
