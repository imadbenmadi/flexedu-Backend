const { getProfile, edit_profile } = require("./Student/Profile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");
const { GetCourse } = require("./Student/Courses");
const StudentController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    edit_profile,
    GetCourse,
};

module.exports = StudentController;
