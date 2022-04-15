const mongoose = require("mongoose");

const groupEventSchema = mongoose.Schema({
    headerName: {
        type: String,
    },
    ToolbarOpen: {
        type: Boolean,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("GroupEvent", groupEventSchema);