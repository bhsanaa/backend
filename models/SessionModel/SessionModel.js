const mongoose = require("mongoose");

const seesionSchema = mongoose.Schema({
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Session", seesionSchema);