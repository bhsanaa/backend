const GroupModel = require("../../models/EventModels/GroupEventModel");
const PageModel = require("../../models/PageModel/PageModel");

const getGroupEvent = async(req, res) => {
    const event = await GroupModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getGroupEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await GroupModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddGroupEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { name, ToolbarOpen } = event;
        const eventCreated = await GroupModel.create({
            headerName: name,
            ToolbarOpen: ToolbarOpen,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        page.groupEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getGroupEvent,
    AddGroupEvent,
    getGroupEventPerPage,
};