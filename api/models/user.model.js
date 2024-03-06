import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },

      resetPasswordToken: {
        type: String,
        default: null
      },

      resetPasswordExpire: {
        type: Date,
        default: null
      },

      emailVerificationToken: {
        type: String,
        default: null
      },

      emailVerified: {
        type: Boolean,
        default: false
      },

      profilePicture :{
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-app-dd9d6.appspot.com/o/1708619212355profile-icon-design-free-vector.jpg?alt=media&token=f0d2aabb-1ac8-47de-8673-e50e2fa22d5f',
      },

      isAdmin: {
        type: Boolean,
        default: false
      },
      
      createdAt: {
        type: Date,
        default: Date.now
      }
},           
{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

export default User;