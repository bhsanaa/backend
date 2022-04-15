const SelectModel = require("../../models/EventModels/SelectEventModel.js");
const PageModel = require("../../models/PageModel/PageModel");

const getSelectEvent = async(req, res) => {
    const event = await SelectModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getSelectEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await SelectModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddSelectEvent = async(data, pageId) => {
    let event;
    if (data > 1) event = "multiple";
    else event = "single";

    const eventCreated = await SelectModel.create({
        nb: data,
        event,
        page: pageId,
    });
    const page = await PageModel.findById(pageId);
    page.selectEvent.push(eventCreated);
    await page.save();
};

module.exports = {
    getSelectEvent,
    AddSelectEvent,
    getSelectEventPerPage,
};