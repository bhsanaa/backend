const mongoose = require("mongoose");

const aggEventSchema = mongoose.Schema({
    aggFunc: {
        type: String,
    },
    headerName: {
        type: String,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("AggEvent", aggEventSchema);