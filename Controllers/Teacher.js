const { getProfile } = require("./Teacher/Profile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const { OpenCourse } = require("./Teacher/Courses");

const TeacherController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    OpenCourse,
};

module.exports = TeacherController;
