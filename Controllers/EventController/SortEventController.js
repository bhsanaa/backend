const SortModel = require("../../models/EventModels/SortEventModel.js");
const PageModel = require("../../models/PageModel/PageModel");

const getSortEvent = async(req, res) => {
    const { id } = req.body;
    const sortEvent = await PageSchema.findById(id).populate("sortEvent");

    if (sortEvent) {
        res.json({ sortEvent });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

const getSortEventPerPage = async(req, res) => {
    const { pageId } = req.params;
    const pageEvents = await SortModel.find({ page: pageId });
    res.json(pageEvents);
};

const AddSortEvent = async(data, pageId) => {
    data.map(async(event) => {
        const { name, sort } = event;
        const eventCreated = await SortModel.create({
            name,
            sort,
            page: pageId,
        });
        const page = await PageModel.findById(pageId);
        page.sortEvent.push(eventCreated);
        await page.save();
    });
};

module.exports = {
    getSortEvent,
    AddSortEvent,
    getSortEventPerPage,
};