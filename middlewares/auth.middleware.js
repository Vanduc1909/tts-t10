import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Khong co token, truy cap bi tu choi",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "Nguoi dung khong ton tai, truy cap bi tu choi",
      });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
  }
};
