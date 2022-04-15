const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
    name: {
        type: String,
    },
    time: {
        type: Number,
    },
    views: {
        type: Number,
    },

    selectEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "SelectEvent" }],
    sortEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "SortEvent" }],
    groupEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupEvent" }],
    filterEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "filterEvent" }],
    aggEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "AggEvent" }],
    searchAccountEvent: [
        { type: mongoose.Schema.Types.ObjectId, ref: "searchAccountEvent" },
    ],
    FilterSearchEvent: [
        { type: mongoose.Schema.Types.ObjectId, ref: "FilterSearchEvent" },
    ],
    checkfilterEvent: [
        { type: mongoose.Schema.Types.ObjectId, ref: "checkfilterEvent" },
    ],
    PinnedEvent: [{ type: mongoose.Schema.Types.ObjectId, ref: "PinnedEvent" }],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
}, {
    timestamps: true,
});
module.exports = mongoose.model("Page", PageSchema);