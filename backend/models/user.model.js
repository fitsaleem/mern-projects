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

      profilePicture :{
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-app-dd9d6.appspot.com/o/1708540890540profile-icon-design-free-vector.jpg?alt=media&token=41651e4c-df4e-4881-ac16-14bc802c5a74',
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