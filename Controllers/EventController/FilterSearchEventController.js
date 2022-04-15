const FilterSearchModel = require("../../models/EventModels/FilterSearchEventModel");
const PageModel = require("../../models/PageModel/PageModel");

const getFilterSearchEvent = async(req, res) => {
    const event = await FilterSearchModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getSearchFilterEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await FilterSearchModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddFilterSearchEvent = async(data, pageId) => {
    const eventCreated = await FilterSearchModel.create({
        nb: data,
        page: pageId,
    });
    const page = await PageModel.findById(pageId);
    page.FilterSearchEvent.push(eventCreated);
    await page.save();
};

module.exports = {
    getFilterSearchEvent,
    AddFilterSearchEvent,
    getSearchFilterEventPerPage,
};