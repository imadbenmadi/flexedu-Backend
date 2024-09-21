const express = require("express");
const router = express.Router();

const Teacher_Middlware = require("../Middlewares/Teacher");
const TeacherController = require("../Controllers/Teacher");
router.get("/:userId/Profile", Teacher_Middlware, TeacherController.getProfile);
router.put(
    "/:userId/Profile",
    Teacher_Middlware,
    TeacherController.edit_profile
);
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
router.get("/:userId/Courses", Teacher_Middlware, TeacherController.GetCourses);
router.get(
    "/:userId/Courses/:courseId",
    Teacher_Middlware,
    TeacherController.GetCourse
);
router.post(
    "/:userId/Courses",
    Teacher_Middlware,
    TeacherController.add_course
);
router.delete(
    "/:userId/Courses/:courseId",
    Teacher_Middlware,
    TeacherController.DeleteCourse
);

module.exports = router;
