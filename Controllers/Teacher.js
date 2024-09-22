const { getProfile, edit_profile } = require("./Teacher/Profile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const {
    add_course,
    GetCourses,
    DeleteCourse,
    GetCourse,
    EditCourse,
    Get_Vedio,
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
    EditCourse,
    Get_Vedio,
};

module.exports = TeacherController;
