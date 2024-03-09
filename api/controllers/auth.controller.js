import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import nodemailer from "nodemailer";
import {errorHandler} from "../utils/error.js";



export const signup = async (req, res , next) => {
  const { username, email, password } = req.body;

  try {

    if (!username || !email || !password || username === "" || email === "" || password === "") {

      return next(errorHandler(400, "All fields are required"));
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
      emailVerificationToken: crypto.randomBytes(20).toString('hex'),
      emailVerified: false,
    });

    await newUser.save();

    await sendVerificationEmail(newUser.email, newUser.emailVerificationToken , req);

    return res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    return res.status(500).json({
        message: "Internal server error",
        })
  }
};

async function sendVerificationEmail(email, token , req) {

  try {
     const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
       auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD,
       },
     });
 
     const mailOptions = {
       to: email,
       from: process.env.EMAIL_USERNAME,
       subject: "Email Verification",
       text: `Please verify your email by clicking the following link:\n\nhttp://${req.headers.host}/verify-email/${token}\n\n`,
     };
 
     await transporter.sendMail(mailOptions);
  } catch (error) {
     console.error('Error sending verification email:', error);
     throw error;
  }
 }
 






export const signin = async (req, res , next) => {
  
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    if (!validUser.emailVerified) {
      return res.status(400).json({
        message: "Please verify your email before logging in.",
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
        emailVerified: true,
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


// forgot password  controller


export const forgotPassword = async (req, res) => {
  
  const {email}= req.body;

  try {

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ message: "No account with that email address exists." });
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
      }
  });

  const mailOptions = {
    to : user.email,
    from: process.env.EMAIL_USERNAME,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset/${user.resetPasswordToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, function(err) {
          if (err) {
              return res.status(500).json({ message: 'Error sending email' });
          }
          res.status(200).json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
      });
    
  } catch (error) {
    return res.status(500).json({message : "Internal server error"});
  }



}


// reset password controller

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid." });
  }
  
  if (Date.now() > user.resetPasswordExpire) {
      return res.status(400).json({ message: "Password reset token is expired." });
  }
  

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
} catch (error) {
    return res.status(500).json({ message: "Internal server error" });
}
};


// verify email controller

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
      const user = await User.findOne({ emailVerificationToken: token });

      if (!user) {
          return res.status(400).json({ message: "Email verification token is invalid." });
      }

      user.emailVerified = true;
      user.emailVerificationToken = undefined;

      await user.save();

      res.status(200).json({ message: "Email has been verified successfully." });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
  }
};
