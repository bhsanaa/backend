const mongoose = require("mongoose");

const PinnedEventSchema = mongoose.Schema({
    name: {
        type: String,
    },
    pinned: {
        type: String,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("PinnedEvent", PinnedEventSchema);