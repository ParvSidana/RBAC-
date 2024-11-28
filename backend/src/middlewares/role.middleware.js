import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("user not found in verifyAdmin");
    if (user.role === "Admin") {
      next();
    } else {
      res.json(
        new ApiResponse(
          400,
          "Access denied, need to be an Admin for this request"
        )
      );
      res.redirect("/");
    }
  } catch (error) {
    console.log(error?.message || "verifyAdmin error");
    return res
      .status(401)
      .json(new ApiResponse(400, error?.message || "verifyAdmin error", {}));
  }
};
const verifyModerator = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("user not found in verifyModerator");

    if (user.role === "Moderator") {
      next();
    } else {
      res.json(
        new ApiResponse(
          400,
          "Access denied, need to be a moderator for this request"
        )
      );
      res.redirect("/");
    }
  } catch (error) {
    console.log(error?.message || "verifyAdmin error");
    return res
      .status(401)
      .json(new ApiResponse(400, error?.message || "verifyAdmin error", {}));
  }
};

export { verifyAdmin, verifyModerator };
