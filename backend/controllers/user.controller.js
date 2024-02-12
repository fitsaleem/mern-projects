import User from "../models/user.model.js";
import brycpt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json({
            message: "All fields are required",
        });
        }

        if (password.length < 6) {
          return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }


    const exestingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (exestingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =  brycpt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password : hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error on signup", error);
    return res.status(500).json({
        message: "Internal server error",
        })
  }
};
