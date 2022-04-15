const {
    getEvents,
    getAllPages,
    getPageDataForHomePage,
    getPopulatedPageEvents,
} = require("../Controllers/PageController/PageController.js");
const express = require("express");
const {
    getSortEventPerPage,
} = require("../Controllers/EventController/SortEventController.js");
const {
    getAggEventPerPage,
} = require("../Controllers/EventController/AggEventController.js");
const {
    getPinnedEventPerPage,
} = require("../Controllers/EventController/PinnedEventController.js");
const {
    getSearchEventPerPage,
} = require("../Controllers/EventController/SearchEventController.js");
const {
    getSelectEventPerPage,
} = require("../Controllers/EventController/SelectEventController.js");
const {
    getGroupEventPerPage,
} = require("../Controllers/EventController/GroupEventController.js");
const {
    getFilterEventPerPage,
} = require("../Controllers/EventController/FilterEventController.js");
const {
    getSearchFilterEventPerPage,
} = require("../Controllers/EventController/FilterSearchEventController.js");
const {
    getCheckFilterEventPerPage,
} = require("../Controllers/EventController/CheckFilterEventController.js");
const {
    getSessionsGroupedByDate,
} = require("../Controllers/SessionController/SessionController.js");

const router = express.Router();

router.get("/:pageId/sortEvents", getSortEventPerPage);
router.get("/:pageId/aggEvents", getAggEventPerPage);
router.get("/:pageId/pinEvents", getPinnedEventPerPage);
router.get("/:pageId/searchEvents", getSearchEventPerPage);
router.get("/:pageId/selectEvents", getSelectEventPerPage);
router.get("/:pageId/groupEvents", getGroupEventPerPage);
router.get("/:pageId/filterEvents", getFilterEventPerPage);
router.get("/:pageId/searchFilterEvents", getSearchFilterEventPerPage);
router.get("/:pageId/checkFilterEvents", getCheckFilterEventPerPage);
router.get("/home", getPageDataForHomePage);
router.get("/sessions", getSessionsGroupedByDate);
router.get("/:pageId", getPopulatedPageEvents);
router.get("/", getAllPages);

module.exports = router;