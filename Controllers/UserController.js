const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async(req, res) => {
    const { username, password } = req.body;

    // Check for user email
    const user = await User.findOne({ username });
    console.log(user);
    if (user && password === user.password) {
        res.json({
            user: user,
            token: generateToken(user._id),
        });
    } else {
        res.json({ err: "Invalid Credentials" });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async(req, res) => {
    res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    loginUser,
    getMe,
};