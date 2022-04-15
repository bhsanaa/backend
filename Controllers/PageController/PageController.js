const PageSchema = require("../../models/PageModel/PageModel");
const SessionModel = require("../../models/SessionModel/SessionModel");

const getPage = async(pageName) => {
    const event = await PageSchema.findOne({ name: pageName });
    return event;
};
const AddPage = async(name) => {
    await PageSchema.create({
        name: name,
        time: 5,
        views: 1,
    });
};

const AddPageView = async(page_id) => {
    await PageSchema.updateOne({ _id: page_id }, { $inc: { views: 1 } });
};

const getEvents = async(req, res) => {
    const { id } = req.body;
    const sortEvent = await PageSchema.findById(id).populate("sortEvent");
    const selectEvent = await PageSchema.findById(id).populate("selectEvent");
    const searchEvent = await PageSchema.findById(id).populate(
        "searchAccountEvent"
    );
    const groupEvent = await PageSchema.findById(id).populate("groupEvent");
    const filterEvent = await PageSchema.findById(id).populate("filterEvent");
    const aggEvent = await PageSchema.findById(id).populate("aggEvent");
    const FilterSearchEvent = await PageSchema.findById(id).populate(
        "FilterSearchEvent"
    );
    const checkfilterEvent = await PageSchema.findById(id).populate(
        "checkfilterEvent"
    );
    const PinnedEvent = await PageSchema.findById(id).populate("PinnedEvent");

    // ;
    res.json({
        sortEvent,
        selectEvent,
        searchEvent,
        groupEvent,
        filterEvent,
        aggEvent,
        FilterSearchEvent,
        PinnedEvent,
        checkfilterEvent,
    });
};

const updateTime = async(id, time) => {
    await PageSchema.updateOne({ _id: id }, { $inc: { time } });
};

const getAllPages = async(req, res) => {
    const page = await PageSchema.find();
    res.json({ page });
};

const getPageIdFromName = async(req, res) => {
    const result = await PageSchema.find({ name: req.params.name });
    res.json({ result });
};

const getPopulatedPage = async(page_id) => {
    const page = await PageSchema.findById(page_id);
    const sortEvent = await PageSchema.findById(page_id).populate("sortEvent");
    const selectEvent = await PageSchema.findById(page_id).populate(
        "selectEvent"
    );
    const searchEvent = await PageSchema.findById(page_id).populate(
        "searchAccountEvent"
    );
    const groupEvent = await PageSchema.findById(page_id).populate("groupEvent");
    const filterEvent = await PageSchema.findById(page_id).populate(
        "filterEvent"
    );
    const aggEvent = await PageSchema.findById(page_id).populate("aggEvent");
    const FilterSearchEvent = await PageSchema.findById(page_id).populate(
        "FilterSearchEvent"
    );
    const checkfilterEvent = await PageSchema.findById(page_id).populate(
        "checkfilterEvent"
    );
    const PinnedEvent = await PageSchema.findById(page_id).populate(
        "PinnedEvent"
    );

    const Sessions = await PageSchema.findById(page_id).populate("sessions");

    return {
        id: page_id,
        pageName: page.name,
        sortEvent: sortEvent.sortEvent,
        selectEvent: selectEvent.selectEvent,
        searchEvent: searchEvent.searchAccountEvent,
        groupEvent: groupEvent.groupEvent,
        filterEvent: filterEvent.filterEvent,
        aggEvent: aggEvent.aggEvent,
        FilterSearchEvent: FilterSearchEvent.FilterSearchEvent,
        checkfilterEvent: checkfilterEvent.checkfilterEvent,
        PinnedEvent: PinnedEvent.PinnedEvent,
        Sessions: Sessions.sessions,
        time: page.time,
    };
};

const getPopulatedPageEvents = async(req, res) => {
    const result = await getPopulatedPage(req.params.pageId);
    res.json({ page: result });
};

const getPageDataForHomePage = async(req, res) => {
    const pages = await PageSchema.find();
    console.log("page :", pages);
    let eventsPerPage = [];
    Promise.all(
        pages.map(async(page) => {
            const pageData = await getPopulatedPage(page._id);

            eventsPerPage.push({
                name: pageData.pageName,

                time: pageData.time,
                sessionNb: pageData.Sessions.length + 1,

                sessionAvg: pageData.time / (pageData.Sessions.length + 1),
                nbEvents: pageData.sortEvent.length +
                    pageData.selectEvent.length +
                    pageData.searchEvent.length +
                    pageData.groupEvent.length +
                    pageData.filterEvent.length +
                    pageData.aggEvent.length +
                    pageData.FilterSearchEvent.length +
                    pageData.checkfilterEvent.length +
                    pageData.PinnedEvent.length,
            });
        })
    ).then(() => {
        let totalEvents = 0;

        eventsPerPage.map((el) => {
            totalEvents += el.nbEvents;
        });
        const newArray = eventsPerPage.map((data) => {
            return {
                ...data,
                nbEvents: data.nbEvents / totalEvents,
            };
        });
        res.json({ newArray });
    });
};

module.exports = {
    AddPage,
    getPage,
    getEvents,
    updateTime,
    AddPageView,
    getAllPages,
    getPageDataForHomePage,
    getPopulatedPageEvents,
};