import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
export const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser.save()
    .then(user => {
      console.log("User created successfully");
      res.status(201).send({ message: "User created", user });
    })
    .catch(err => {
      console.error("Error creating user:", err);
      res.status(500).send({ message: "Error occurred", err });
    });
};

// Login user
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

    // Create JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie (must match on logout for deletion to work)
    res.cookie("token", token, {
      httpOnly: true,   // safer: cookie can’t be read via JS
      secure: true,     // must be HTTPS in production
      sameSite: "None", // needed for cross-site cookies
      path: "/",        // MUST match logout to clear correctly
      maxAge: 60 * 60 * 1000
    });

    return res.status(200).send({ message: "Successfully logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
};

// Check if user is logged in
export const isloggedIn = (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ loggedIn: false });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ loggedIn: false });
    return res.status(200).json({ loggedIn: true, username: decoded.username });
  });
};

// Logout user (delete cookie)
export const logOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/", // MUST match login cookie path
  });
  res.status(200).json({ message: "Logged out successfully" });
};
