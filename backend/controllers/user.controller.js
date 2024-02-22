import User from "../models/user.model.js";
import bcrypet from "bcryptjs";





// Update user data 

export const updateUser  = async (req, res) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json("You can only update your account");
      }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json("Password must be at least 6 characters long");
    }
    req.body.password = bcrypet.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 30) {
      return res
        .status(400)
        .json("Username must be between 7 and 30 characters");
    }
    if (req.body.username.includes(" ")) {
      return res.status(400).json("Username cannot contain spaces");
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json("Username can only contain lowercase letters");
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        res.status(400).json("Username can only contain letters and numbers")
      );
    }
  }
  
  

 
 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user data end


