const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a name"],
    },
    title: {
        type: String,
        required: [true, "Please add a title"],
    },
    departement: {
        type: String,
        required: [true, "Please add a departement"],
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Admin", adminSchema);