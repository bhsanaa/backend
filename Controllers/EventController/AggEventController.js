const AggModel = require("../../models/EventModels/AggEventModel.js");
const PageModel = require("../../models/PageModel/PageModel");

const getAggEvent = async(req, res) => {
    const event = await AggModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getAggEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await AggModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddAggEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { functionName, fieldName } = event;
        const eventCreated = await AggModel.create({
            aggFunc: functionName,
            headerName: fieldName,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        page.aggEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getAggEvent,
    AddAggEvent,
    getAggEventPerPage,
};