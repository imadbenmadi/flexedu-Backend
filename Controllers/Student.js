const { getProfile, edit_profile } = require("./Student/Profile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Student/Notifications");
const { GetCourse, Get_Courses } = require("./Student/Courses");
const { Get_Summaries, GetSummary } = require("./Student/Summaries");
const StudentController = {
    getProfile,
    GetNotifications,
    DeleteNotification,
    edit_profile,
    GetCourse,
    Get_Courses,
    Get_Summaries,
    GetSummary,
};

module.exports = StudentController;
