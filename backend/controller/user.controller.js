import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET
export const createUser = (req, res)=>{
    const {username, password} = req.body;
    const newUser = new User({username, password})
    newUser.save()
    .then(user=>{
        console.log("User created Sucessfully")
        res.status(201).send({message:"User created", user})
    })
    .catch(err=>{
        console.log("An error occured while creating user")
        res.status(500).send({message:"Error occured", err})
    })
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: "Username and password are mandatory" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "Username or password is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).send({ message: "Username or password is incorrect" });
        }
        //create JWT
        const token = jwt.sign(
            {id:user._id, username:user.username},
            JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.cookie("token", token, {
            httpOnly: false, 
            secure: true,   
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).send({ message: "Successfully logged in" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
};


