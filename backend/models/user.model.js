import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema =  mongoose.Schema({
    username:{
        type:String,
        required:[true, "Enter your username"],
        minlength:[3, "Username must be atleast 3 characters"],
        unique:[true, "Username must be unique"]
    },
    password:{
        type:String,
        required:[true, "Enter your password"],
        minlength:[6, "Password must be atleast 6 characters"]
    }
}, {timestamps:true})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hashed=>{this.password = hashed;
        next()})
    .catch((err)=>next(err))
})

const User = mongoose.model('User', UserSchema)
export default User