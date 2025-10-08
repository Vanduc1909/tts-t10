import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

    // validation

    // kiem tra xem co chua?

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });
    if (!user) {
      return res.status(400).json({
        message: "khong the dang ky tai khoan, vui long kiem tra lai",
        success: false,
      });
    }

    user.password = undefined;
    return res.status(201).json({
      message: "dang ky thanh cong",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      return res.status(400).json({
        message: "Username khong ton tai",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mat khau khong chinh xac",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: checkUser._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "Dang nhap thanh cong",
      success: true,
      data: { user: checkUser, token },
    });
  } catch (error) {
    console.log(error);
  }
};
