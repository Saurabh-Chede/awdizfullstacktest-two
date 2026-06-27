import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const verifyAndDecodeToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.userId = user._id;
    req.userData = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.userData.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only Admin can access this resource.",
    });
  }

  next();
};

export const isEmployee = (req, res, next) => {
  if (req.userData.role !== "employee") {
    return res.status(403).json({
      success: false,
      message: "Only Employee can access this resource.",
    });
  }

  next();
};