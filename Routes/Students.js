const express = require("express");
const router = express.Router();
const Student_Middlware = require("../Middlewares/Student");
const StudentController = require("../Controllers/Student");
router.get("/:userId/Profile", Student_Middlware, StudentController.getProfile);
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
router.put(
    "/:userId/Profile",
    Student_Middlware,
    StudentController.edit_profile
);

module.exports = router;
