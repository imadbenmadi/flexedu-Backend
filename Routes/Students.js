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
    "/:userId/Courses",
    Student_Middlware,
    StudentController.Get_Courses
);
router.get(
    "/Courses/:courseId",
    Student_Middlware,
    StudentController.GetCourse
);
router.get(
    "/Summaries",
    Student_Middlware,
    StudentController.Get_Summaries
);
router.get(
    "/Summaries/:summaryId",
    Student_Middlware,
    StudentController.GetSummary
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
