const express = require("express");
const router = express.Router();
const Courses = require("../../Models/Course");
const Course_Video = require("../../Models/Course_Video");

const Admin_Middleware = require("../../Middlewares/Admin");
router.get("/", Admin_Middleware, async (req, res) => {
    try {
        const courses = await Courses.findAll({
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
            ],

            order: [["createdAt", "DESC"]],
        });
        if (!courses)
            return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ Courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/:courseId", Admin_Middleware, async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        return res.status(200).json({ Course: course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/:courseId/Videos/:vedioId", Admin_Middleware, async (req, res) => {
    const courseId = req.params.courseId;
    const vedioId = req.params.vedioId;
    if (!courseId || !vedioId)
        return res.status(409).json({
            error: "Unauthorized , missing courseId or vedioId",
        });
    try {
        const vedio = await Course_Video.findOne({
            where: {
                id: vedioId,
                CourseId: courseId,
            },
            include: [
                {
                    model: Courses,
                },
            ],
        });
        if (!vedio) return res.status(404).json({ error: "vedio not found." });

        return res.status(200).json({ Vedio: vedio });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.put("/:courseId", Admin_Middleware, async (req, res) => {
    const courseId = req.params.courseId;
    const { Title, Description, Price, Category } = req.body;
    if (!courseId || !Title || !Description || !Price || !Category)
        return res.status(409).json({
            error: "Unauthorized , missing courseId or Title or Description or Price or Category",
        });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        course.Title = Title;
        course.Description = Description;
        course.Price = Price;
        course.Category = Category;
        await course.save();
        return res.status(200).json({ message: "course updated." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.delete("/:courseId", Admin_Middleware, async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        await course.destroy();
        // We have to delete all the Vedios of this course too
        // we have to delete the course ownership from the students too
        // we have to delete the couse progress of the students too
        // we have to delete the reviews of this course too
        // we have to delete the notifications of this course too
        return res.status(200).json({ message: "course deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
// router.delete(
//     "/:courseId",
//     Admin_Middleware,
//     TeacherController.DeleteCourse
// );
module.exports = router;
