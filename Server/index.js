// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const cors = require("cors");
const PageRouter = require("../Routes/PageRouter");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const {
    getPage,
    updateTime,
    AddPage,
    AddPageView,
} = require("../Controllers/PageController/PageController");

const {
    AddPinnedEvent,
} = require("../Controllers/EventController/PinnedEventController");

const {
    AddCheckfilterEvent,
} = require("../Controllers/EventController/CheckfilterEventController");

const {
    AddFilterSearchEvent,
} = require("../Controllers/EventController/FilterSearchEventController");

const {
    AddSortEvent,
} = require("../Controllers/EventController/SortEventController");
const {
    AddfilterEvent,
} = require("../Controllers/EventController/filterEventController");
const {
    AddGroupEvent,
} = require("../Controllers/EventController/GroupEventController");
const {
    AddSelectEvent,
} = require("../Controllers/EventController/SelectEventController");
const {
    AddAggEvent,
} = require("../Controllers/EventController/AggEventController");
const {
    AddSearchEvent,
} = require("../Controllers/EventController/SearchEventController");
const {
    createSession,
    updateSession,
} = require("../Controllers/SessionController/SessionController");

app.use("/", PageRouter);
let time = 0;
mongoose.connect(process.env.DB).then((db) => {
    const ws = new WebSocket.Server({ port: 8081 });
    let lastPage = null;
    ws.on("connection", function connection(wsConnection) {
        wsConnection.on("message", async(message) => {
            const obj = JSON.parse(message);
            console.log(obj);

            const page = await getPage(obj.page);
            if (!page) AddPage(obj.page);

            if (obj.Event && obj.Event["sortEvent"].length > 0)
                AddSortEvent(obj.Event["sortEvent"], page._id);

            if (obj.Event && obj.Event["filterEvent"].length > 0)
                AddfilterEvent(obj.Event["filterEvent"], page._id);

            if (obj.Event && obj.Event["checkfilterEvent"].length > 0)
                AddCheckfilterEvent(obj.Event["checkfilterEvent"], page._id);
            // console.log(obj.Event["checkfilterEvent"]);

            if (obj.Event && obj.Event["filterSearchEvent"] > 0)
                AddFilterSearchEvent(obj.Event["filterSearchEvent"], page._id);

            if (obj.Event && obj.Event["searchEvent"] > 0)
                AddSearchEvent(obj.Event["searchEvent"], page._id);

            if (obj.Event && obj.Event["aggEvent"].length > 0)
                AddAggEvent(obj.Event["aggEvent"], page._id);

            if (obj.Event && obj.Event["groupEvent"].length > 0)
                AddGroupEvent(obj.Event["groupEvent"], page._id);

            if (obj.Event && obj.Event["selectEvent"] > 0)
                AddSelectEvent(obj.Event["selectEvent"], page._id);

            if (obj.Event && obj.Event["pinnedEvent"].length > 0)
                AddPinnedEvent(obj.Event["pinnedEvent"], page._id);

            if (obj.Event && obj.pageViewed) {
                await createSession(page._id);
                AddPageView(page._id);
            }

            updateSession(page._id);
            updateTime(page._id, obj.time);
        });
    });
});
app.listen(5000, () => {
    console.log("started");
});