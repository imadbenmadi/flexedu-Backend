const express = require("express");
const router = express.Router();

const Teacher_Middlware = require("../Middlewares/Teacher");
const TeacherController = require("../Controllers/Teacher");
router.get("/:userId/Profile", Teacher_Middlware, TeacherController.getProfile);

router.get(
    "/:userId/Notifications",
    Teacher_Middlware,
    TeacherController.GetNotifications
);
router.delete(
    "/:userId/Notifications/:notificationId",
    Teacher_Middlware,
    TeacherController.DeleteNotification
);

router.post(
    "/:userId/Courses",
    Teacher_Middlware,
    TeacherController.OpenCourse
);

module.exports = router;
