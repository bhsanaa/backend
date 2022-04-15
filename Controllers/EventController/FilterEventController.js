const FilterModel = require("../../models/EventModels/filterEventModel.js");
const PageModel = require("../../models/PageModel/PageModel");

const getfilterEvent = async(req, res) => {
    const event = await FilterModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getFilterEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await FilterModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddfilterEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { name, ToolbarOpen } = event;
        const eventCreated = await FilterModel.create({
            headerName: name,
            ToolbarOpen: ToolbarOpen,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        page.filterEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getfilterEvent,
    AddfilterEvent,
    getFilterEventPerPage,
};