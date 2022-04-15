const SessionModel = require("../../models/SessionModel/SessionModel");
const PageModel = require("../../models/PageModel/PageModel");

const createSession = async(page_id) => {
    const eventCreated = await SessionModel.create({
        page: page_id,
    });
    const page = await PageModel.findById(page_id);
    page.sessions.push(eventCreated);
    await page.save();
};

const updateSession = async(page_id) => {
    const session = await SessionModel.find({ page: page_id })
        .sort({ _id: -1 })
        .limit(1);
    session[0].endDate = Date.now();
    session[0].save();
};

const getSessionsGroupedByDate = async(req, res) => {
    const groupedSessions = await SessionModel.aggregate([{
        $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
            obj: {
                $push: { page: "$page", startDate: "$startDate", endDate: "$endDate" },
            },
        },
    }, ]);
    res.json({ res: groupedSessions });
};

module.exports = {
    createSession,
    updateSession,
    getSessionsGroupedByDate,
};