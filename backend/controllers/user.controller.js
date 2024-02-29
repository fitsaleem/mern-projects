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


// Delete user data start


export const deleteUser = async (req, res) => {

  if (!req.user.isAdmin &&    req.user.id !== req.params.userId) {
    return res.status(403).json("You can only delete your account");
  }

  try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");


  } catch (error) {
     
    res.status(500).json(error);
  }

}           

// Delete user data end


// sign out 

export const signout  = (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json({
    message: "User logged out successfully",
  });
}

// sign out end


// get users

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

// get users end


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};




