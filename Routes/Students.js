const express = require("express");
const router = express.Router();
const Student_Middlware = require("../Middlewares/Student");
const StudentController = require("../Controllers/Student");

router.get("/:userId/Profile", Student_Middlware, StudentController.getProfile);
router.put(
    "/:userId/Profile",
    Student_Middlware,
    StudentController.edit_profile
);

router.get(
    "/Courses/:courseId",
    Student_Middlware,
    StudentController.GetCourse
);

router.get(
    "/:userId/Notifications",
    Student_Middlware,
    StudentController.GetNotifications
);
router.delete(
    "/:userId/Notifications/:notificationId",
    Student_Middlware,
    StudentController.DeleteNotification
);

module.exports = router;
