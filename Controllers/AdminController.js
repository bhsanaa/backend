const Admin = require("../models/AdminModel");

const getAdmin = async(req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
        res.json({ err: "User not found" });
        return;
    }
    if (user.password === password) {
        res.json({ admin: user });
    }
};

module.exports = {
    getAdmin,
};