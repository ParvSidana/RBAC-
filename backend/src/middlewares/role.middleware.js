import { User } from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("user not found in verifyAdmin");
    if (user.role === "Admin") {
      next();
    } else {
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
