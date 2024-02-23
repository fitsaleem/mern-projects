import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken';


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


    const exestingUser = await User.findOne({ email  });

    if (exestingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const existingUsername = await User.findOne({ username});

    if (existingUsername) {
      return res.status(400).json({
        message: "please choose another username", 
      });
    }

    const hashedPassword =  bcrypt.hashSync(password, 10);

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
    return res.status(500).json({
        message: "Internal server error",
        })
  }
};





export const signin = async (req, res) => {
  
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, validUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: validUser._id , isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);

    const { password: userPassword, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        message: "User logged in successfully",
        ...rest
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const google = async (req, res) => {

  const { name, email, googlePhotoUrl } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

      const { password: userPassword, ...rest } = existingUser._doc;

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({
          message: "User logged in successfully",
          ...rest
        });
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8)+
      Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id , isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

      const { password: userPassword, ...rest } = newUser._doc;
      return res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        message: "User created successfully",
        ...rest
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


