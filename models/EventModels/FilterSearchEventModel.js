const mongoose = require("mongoose");

const FilterSearchEventSchema = mongoose.Schema({
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

module.exports = mongoose.model("FilterSearchEvent", FilterSearchEventSchema);