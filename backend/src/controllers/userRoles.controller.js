import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const adminRole = async (req, res) => {
  try {
    // Admin has access to all users
    const users = await User.find({});

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
    const clients = await User.find({ role: { $ne: "Admin" } });
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
    const user = await User.findById(req.user._id);
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

export { adminRole, moderatorRole, userRole };
