const mongoose = require("mongoose");

const searchEventSchema = mongoose.Schema({
    nb: {
        type: Number,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("searchAccountEvent", searchEventSchema);