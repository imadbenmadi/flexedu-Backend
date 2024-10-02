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
router.post("/:userId/CCP", Teacher_Middlware, TeacherController.change_CCP);
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
// _________________________________________________________
router.get("/:userId/Courses", Teacher_Middlware, TeacherController.GetCourses);
router.get(
  "/:userId/Courses/:courseId",
  Teacher_Middlware,
  TeacherController.GetCourse
);
router.get(
  "/:userId/Courses/:courseId/Videos/:vedioId",
  Teacher_Middlware,
  TeacherController.Get_Vedio
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
router.put(
  "/:userId/Courses/:courseId",
  Teacher_Middlware,
  TeacherController.EditCourse
);
// _________________________________________________________
router.get(
  "/:userId/Summaries",
  Teacher_Middlware,
  TeacherController.GetSummaries
);
router.get(
  "/:userId/Summaries/:summaryId",
  Teacher_Middlware,
  TeacherController.GetSummary
);
router.put(
  "/:userId/Summaries/:summaryId",
  Teacher_Middlware,
  TeacherController.EditSummary
);
router.delete(
  "/:userId/Summaries/:summaryId",
  Teacher_Middlware,
  TeacherController.DeleteSummary
);
router.post(
  "/:userId/Summaries",
  Teacher_Middlware,
  TeacherController.add_Summary
);
// _________________________________________________________
router.get(
  "/:userId/Payments",
  Teacher_Middlware,
  TeacherController.Get_Payment
);

module.exports = router;
