const SearchModel = require("../../models/EventModels/SearchEventModel");
const PageModel = require("../../models/PageModel/PageModel");

const getSearchEvent = async(req, res) => {
    const event = await SearchModel.find();
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getSearchEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await SearchModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddSearchEvent = async(data, pageId) => {
    const eventCreated = await SearchModel.create({
        nb: data,
        page: pageId,
    });
    const page = await PageModel.findById(pageId);
    page.searchAccountEvent.push(eventCreated);
    await page.save();
};

module.exports = {
    getSearchEvent,
    AddSearchEvent,
    getSearchEventPerPage,
};