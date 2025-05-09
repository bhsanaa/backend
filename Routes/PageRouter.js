const {
    getEvents,
    getAllPages,
    getPageDataForHomePage,
    getPopulatedPageEvents,
    getPageDataForInfoPage,
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
    getSessionByPageIdGroupedByDate,
} = require("../Controllers/SessionController/SessionController.js");
const {
    loginUser,
    updateUser,
    requestPasswordReset,
    passwordReset,
    getUserById,
    AddUser,
    DeleteUser,
    UpdateUser,
    getAllUsers,
} = require("../Controllers/UserController.js");

const { getAdmin } = require("../Controllers/AdminController.js");

const router = express.Router();
router.post("/signin", loginUser);
router.put("/settings", updateUser);
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
router.get("/info/:id", getPageDataForInfoPage);
router.get("/sessions/:id", getSessionByPageIdGroupedByDate);
router.get("/sessions", getSessionsGroupedByDate);
router.post("/resetPasswordRequest", requestPasswordReset);
router.post("/passwordReset", passwordReset);
router.post("/user/add", AddUser);
router.put("/user/update/:id", UpdateUser);
router.delete("/user/delete/:id", DeleteUser);
router.get("/user/:id", getUserById);
router.get("/user", getAllUsers);

router.get("/:pageId", getPopulatedPageEvents);
router.get("/", getAllPages);

router.post("/admin", getAdmin);

module.exports = router;