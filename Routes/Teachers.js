const express = require("express");
const router = express.Router();

const Teacher_Middlware = require("../Middlewares/Teacher");
const TeacherController = require("../Controllers/Teacher");
router.get("/:userId/Profile", Teacher_Middlware, TeacherController.getProfile);
router.put(
    "/:userId/Profile",
    Teacher_Middlware,
    TeacherController.EditeProfile
);

// router.get("/:userId/Projects", Teacher_Middlware, TeacherController.GetProjcts);
// router.get(
//     "/:userId/Projects/:projectId",
//     Teacher_Middlware,
//     TeacherController.GetProject
// );
// router.post("/:userId/Projects", Teacher_Middlware, TeacherController.AddProject);
// router.delete(
//     "/:userId/Projects/:projectId",
//     Teacher_Middlware,
//     TeacherController.DeleteProject
// );

// router.get(
//     "/:userId/Payment/:projectId/status",
//     Teacher_Middlware,
//     TeacherController.PaymentStatus
// );

// router.get("/:userId/Process", Teacher_Middlware, TeacherController.GetProcess);

// router.post(
//     "/:userId/Projects/:projectId/Accept_work",
//     Teacher_Middlware,
//     TeacherController.Accept_work
// );
// router.post(
//     "/:userId/Projects/:projectId/Reject_work",
//     Teacher_Middlware,
//     TeacherController.Reject_work
// );
// router.get(
//     "/:userId/:projectId/Rejections",
//     Teacher_Middlware,
//     TeacherController.GetRejections
// );

// router.get(
//     "/:userId/Notifications",
//     Teacher_Middlware,
//     TeacherController.GetNotifications
// );
// router.delete(
//     "/:userId/Notifications/:notificationId",
//     Teacher_Middlware,
//     TeacherController.DeleteNotification
// );
// router.post(
//     "/:userId/Rate/:StudentId",
//     Teacher_Middlware,
//     TeacherController.RateFreealncer
// );

// router.get(
//     "/:userId/Feedbacks",
//     Teacher_Middlware,
//     TeacherController.GetFeedbacks
// );
module.exports = router;
