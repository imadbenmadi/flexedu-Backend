const { getProfile, edit_profile } = require("./Student/Profile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");

const StudentController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    edit_profile,
};

module.exports = StudentController;
