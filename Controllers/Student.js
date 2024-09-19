const { getProfile } = require("./Student/Profile");
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
