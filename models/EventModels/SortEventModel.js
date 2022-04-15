const mongoose = require("mongoose");

const sortEventSchema = mongoose.Schema({
    name: {
        type: String,
    },
    sort: {
        type: String,
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("SortEvent", sortEventSchema);