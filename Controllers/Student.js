const { getProfile } = require("./Student/getProfile");
const { EditeProfile } = require("./Student/EditeProfile");
const { GetProcess } = require("./Student/GetProcess");
const { GetProcess_item } = require("./Student/GetProcess_item");
const { GetRejections } = require("./Student/GetRejection");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");
const { RateTeacher } = require("./Teacher/Feedback_to_Teacher");
const { GetFeedbacks } = require("./Student/GetFeedbacks");

const StudentController = {
    getProfile,
    EditeProfile,
    GetProcess,
    GetProcess_item,
    GetRejections,
    GetNotifications,
    DeleteNotification,
    RateTeacher,
    GetFeedbacks,
};

module.exports = StudentController;
