const { getProfile } = require("./Teacher/Profile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const { add_course, GetCourses } = require("./Teacher/Courses");

const TeacherController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    add_course,
    GetCourses
};

module.exports = TeacherController;
