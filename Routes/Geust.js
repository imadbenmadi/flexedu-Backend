const express = require("express");
const router = express.Router();

const GeustController = require("../Controllers/Geust");
router.get("/:userId/Courses", GeustController.GetCourses);
router.get("/:userId/Courses/:courseId", GeustController.GetCourse);

module.exports = router;
