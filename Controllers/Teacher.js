const { getProfile, edit_profile } = require("./Teacher/Profile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const {
    add_course,
    GetCourses,
    DeleteCourse,
    GetCourse,
    
} = require("./Teacher/Courses");

const TeacherController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    add_course,
    GetCourses,
    DeleteCourse,
    edit_profile,
    GetCourse,
};

module.exports = TeacherController;
