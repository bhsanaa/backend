const mongoose = require("mongoose");

const selectEventSchema = mongoose.Schema({
    nb: {
        type: Number,
    },
    event: {
        type: String,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("SelectEvent", selectEventSchema);