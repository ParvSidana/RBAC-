import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const adminRole = async (req, res) => {
  try {
    // Admin has access to all users
    const users = await User.find({}).select("-password");

    if (!users) throw new Error("No users found");

    return res
      .status(201)
      .json(new ApiResponse(200, "Welcome Admin, all users returned", users));
  } catch (error) {
    console.log("Error in adminRole route", error);
    return res.status(501).json(new ApiResponse(500, "Users not found", {}));
  }
};

const moderatorRole = async (req, res) => {
  try {
    // moderator has access to users that are not admin
    const clients = await User.find({ role: { $ne: "Admin" } }).select(
      "-password"
    );
    if (!clients) throw new Error("No clients found");

    return res
      .status(201)
      .json(
        new ApiResponse(200, "Welcome Moderator, all Clients returned", clients)
      );
  } catch (error) {
    console.log("Error in managerRole route", error);
    return res.status(501).json(new ApiResponse(500, "Users not found", {}));
  }
};
const userRole = async (req, res) => {
  try {
    // user has access to only personal data
    const user = await User.findById(req.user._id).select("-password");
    if (!user) throw new Error("No user found in userRole");

    return res
      .status(201)
      .json(
        new ApiResponse(200, "Welcome User, data returned successfully", user)
      );
  } catch (error) {
    console.log("Error in userRole route", error);
    return res.status(501).json(new ApiResponse(500, "Users not found", {}));
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role: newRole,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) throw new Error("No user found");

    return res
      .status(200)
      .json(new ApiResponse(201, "Role updated Successfully", updatedUser));
  } catch (error) {
    console.log("Error in updateUserRole route", error);
    return res.status(501).json(new ApiResponse(500, "Role not updated", {}));
  }
};

export { adminRole, moderatorRole, userRole, updateUserRole };
