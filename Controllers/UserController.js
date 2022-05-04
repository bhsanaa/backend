const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Token = require("../models/TokenModel");
const { sendEmail } = require("../helpers/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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

//update user
const updateUser = async(req, res) => {
    const { username, password, confirm } = req.body;
    const user = await User.updateOne({ username }, { username, password });
    res.json({
        user: user,
        token: generateToken(user._id),
    });
};

const requestPasswordReset = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.json({ err: "Email doesnt correspand to user account" });
        return;
    }
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 12);

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/user/passwordReset?token=${resetToken}&id=${user._id}`;

    if (sendEmail(user.email, "Password Reset Request", link)) {
        res.json({
            status: "Success",
        });
        console.log("email sent");
    } else {
        res.json({ err: "Error Sending Email" });
    }
};

const passwordReset = async(req, res) => {
    const { userId, token, password } = req.body;

    let passwordResetToken = await Token.findOne({ userId: req.body.userId });
    if (!passwordResetToken) {
        res.json({ err: "Invalid or expired password reset token" });
        return;
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        res.json({ err: "Invalid or expired password reset token" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });

    await passwordResetToken.deleteOne();
    return res.json({ status: "Success" });
};

const getUserById = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.json({ err: "No User Found" });
    }
    res.json({ user });
};

const AddUser = async(req, res) => {
    console.log("lol ", req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) res.json({ err: "User Already Exists" });
    const queryRes = await User.create(req.body);
    res.json({ user: queryRes });
};

const UpdateUser = async(req, res) => {
    const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    res.status(201).json(data);
};

const DeleteUser = async(req, res) => {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "User deleted with success" });
};

const getAllUsers = async(req, res) => {
    const queryRes = await User.find();
    res.json({ users: queryRes });
};

//Reset user password :
module.exports = {
    loginUser,
    getMe,
    updateUser,
    passwordReset,
    requestPasswordReset,
    getUserById,
    AddUser,
    UpdateUser,
    DeleteUser,
    getAllUsers,
};