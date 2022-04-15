const CheckFilterModel = require("../../models/EventModels/CheckfilterEventModel");
const PageModel = require("../../models/PageModel/PageModel");

const getCheckfilterEvent = async(req, res) => {
    const event = await CheckFilterModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getCheckFilterEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await CheckFilterModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddCheckfilterEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { name, ToolbarOpen } = event;
        const eventCreated = await CheckFilterModel.create({
            headerName: name,
            ToolbarOpen: ToolbarOpen,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        console.log("sanaaaa ", page);
        page.checkfilterEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getCheckfilterEvent,
    AddCheckfilterEvent,
    getCheckFilterEventPerPage,
};