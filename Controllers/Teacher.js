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
const {
    GetSummaries,
    GetSummary,
    EditSummary,
    DeleteSummary,
    add_Summary,
} = require("./Teacher/Summaries");
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
    GetSummaries,
    GetSummary,
    EditSummary,
    DeleteSummary,
    add_Summary,
};

module.exports = TeacherController;
