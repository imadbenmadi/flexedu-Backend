const express = require("express");
const router = express.Router();
const Student_Middlware = require("../Middlewares/Student");
const StudentController = require("../Controllers/Student");
router.get("/:userId/Profile", Student_Middlware, StudentController.getProfile);
router.put(
    "/:userId/Profile",
    Student_Middlware,
    StudentController.EditeProfile
);
// router.use("/Jobs", require("./Jobs"));

// router.get(
//     "/:userId/Process",
//     Student_Middlware,
//     StudentController.GetProcess
// );
// router.get(
//     "/:userId/Process/:projectId",
//     Student_Middlware,
//     StudentController.GetProcess_item
// );
// router.get(
//     "/:userId/:projectId/Rejections",
//     Student_Middlware,
//     StudentController.GetRejections
// );
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
// router.post(
//     "/:userId/Rate/:TeacherId",
//     Student_Middlware,
//     StudentController.RateTeacher
// );
// router.get(
//     "/:userId/Feedbacks",
//     Student_Middlware,
//     StudentController.GetFeedbacks
// );

module.exports = router;
