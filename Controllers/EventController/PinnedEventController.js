const PinnedModel = require("../../models/EventModels/PinnedEventModel.js");
const PageModel = require("../../models/PageModel/PageModel");

const getPinnedEvent = async(req, res) => {
    const event = await PinnedModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getPinnedEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await PinnedModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddPinnedEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { name, pinned } = event;
        const eventCreated = await PinnedModel.create({
            name: name,
            pinned: pinned,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        page.PinnedEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getPinnedEvent,
    AddPinnedEvent,
    getPinnedEventPerPage,
};