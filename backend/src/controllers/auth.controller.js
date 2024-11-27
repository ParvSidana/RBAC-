import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json(new ApiResponse(400, "User already exists", {}));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json(new ApiResponse(200, "User registered Successfully", newUser));
  } catch (error) {
    console.log("Error in register route", error);
    return res
      .status(501)
      .json(new ApiResponse(500, "User not registered ", {}));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json(new ApiResponse(400, "User not found ", {}));

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Password is Incorrect");

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(201).cookie("jwt", token, options).json(
      new ApiResponse(200, "User logged in Successfully", {
        user,
        token,
      })
    );
  } catch (error) {
    console.log("Error in login route", error);
    return res
      .status(501)
      .json(new ApiResponse(500, "User not logged in ", {}));
  }
};

const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .clearCookie("jwt", options)
      .json(new ApiResponse(200, "User logout Successfully", {}));
  } catch (error) {
    console.log("Error in logout route", error);
    return res
      .status(501)
      .json(new ApiResponse(500, "User not logged out ", {}));
  }
};

export { registerUser, loginUser, logoutUser };
