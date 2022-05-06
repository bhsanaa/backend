const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");

const getAdmin = async(req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    console.log("admin ", user);
    if (!user) {
        res.json({ err: "User not found" });
        return;
    }
    if (user.password === password) {
        res.json({ admin: user, token: generateToken(user._id) });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    getAdmin,
};