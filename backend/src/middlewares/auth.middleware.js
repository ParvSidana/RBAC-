import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/Apiresponse.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new Error("Token not found");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Returns the payload decoded if the signature is valid. If not, it will throw the error.

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) throw new Error("Invalid Access token");

    req.user = user;
    next();
  } catch (error) {
    console.log(error?.message || "Invalid Access token");
    return res
      .status(401)
      .json(new ApiResponse(400, error?.message || "Invalid Access token", {}));
  }
};
