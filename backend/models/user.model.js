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
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F831%2F88%2Fpng-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png&tbnid=DWa7uEKMAer0uM&vet=12ahUKEwiPrOPJo62EAxVJWqQEHVkaA4gQMygAegQIARBp..i&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-nazmd&docid=Tj1Js2HFEhp1UM&w=920&h=920&q=userprofile%20png&ved=2ahUKEwiPrOPJo62EAxVJWqQEHVkaA4gQMygAegQIARBp',
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