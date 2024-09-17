const { getProfile } = require("./Student/getProfile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");

const StudentController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
};

module.exports = StudentController;
