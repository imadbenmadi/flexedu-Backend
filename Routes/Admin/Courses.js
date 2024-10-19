const express = require("express");
const router = express.Router();
const Courses = require("../../Models/Course");
const Course_Video = require("../../Models/Course_Video");
const Course_Progress = require("../../Models/Course_Progress");
const path = require("path");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
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
    if (!courseId || !Title || !Description || !Category)
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
            .status(401)
            .json({ error: "Unauthorized, missing  courseId" });

    try {
        // Fetch course once
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "Course not found." });

        // Check if course is already bought or requested
        const courseProgress = await Course_Progress.findAll({
            where: { CourseId: courseId },
        });
        if (courseProgress.length > 0) {
            return res.status(403).json({
                message:
                    "Unauthorized, course has been bought by students. Can't delete it.",
            });
        }

        const coursePurchaseRequests = await Course_Purcase_Requests.findAll({
            where: { CourseId: courseId },
        });
        if (coursePurchaseRequests.length > 0) {
            return res.status(403).json({
                message:
                    "Unauthorized, course has been requested by students. Can't delete it.",
            });
        }

        // Delete videos
        const courseVideos = await Course_Video.findAll({
            where: { CourseId: courseId },
        });
        await Promise.all(
            courseVideos.map(async (video) => {
                const videoId = video.id;
                const courseVideo = await Course_Video.findOne({
                    where: { id: videoId, CourseId: course.id },
                });
                if (!courseVideo) {
                    throw new Error(
                        "Video not found for the given courseId and videoId"
                    );
                }

                const previousVideoFilename =
                    courseVideo.Video.split("/").pop();
                const previousVideoPath = path.join(
                    "public/Courses_Videos",
                    previousVideoFilename
                );

                if (fs.existsSync(previousVideoPath)) {
                    try {
                        fs.unlinkSync(previousVideoPath);
                    } catch (error) {
                        console.error("Error deleting file: ", error);
                    }
                }

                // Remove video entry from the database
                await Course_Video.destroy({ where: { id: videoId } });
            })
        );

        // Delete course image
        if (course?.Image) {
            const previousImageFilename = course.Image.split("/").pop();
            const previousImagePath = path.join(
                "public/Courses_Pictures",
                previousImageFilename
            );

            if (fs.existsSync(previousImagePath)) {
                try {
                    fs.unlinkSync(previousImagePath);
                } catch (error) {
                    console.error("Error deleting file: ", error);
                }
            }
        }

        // Delete course from the database
        await course.destroy();

        return res
            .status(200)
            .json({ message: "Course deleted successfully." });
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
