const { getProfile } = require("./Student/getProfile");
const { EditeProfile } = require("./Student/EditeProfile");
const { GetProcess } = require("./Student/GetProcess");
const { GetProcess_item } = require("./Student/GetProcess_item");
const { GetRejections } = require("./Student/GetRejection");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");
const { RateClient } = require("./Teacher/Feedback_to_Client");
const { GetFeedbacks } = require("./Student/GetFeedbacks");

const FreelancerController = {
    getProfile,
    EditeProfile,
    GetProcess,
    GetProcess_item,
    GetRejections,
    GetNotifications,
    DeleteNotification,
    RateClient,
    GetFeedbacks,
};

module.exports = FreelancerController;
