const { getProfile } = require("./Teacher/Profle/getProfile");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");


const TeacherController = {
    getProfile,    
    GetNotifications,
    DeleteNotification,
};

module.exports = TeacherController;
