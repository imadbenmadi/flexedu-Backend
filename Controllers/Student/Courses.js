const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Reviews = require("../../Models/Review_Course");
const Course_Meets = require("../../Models/Course_Meets");

const Get_Courses = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const courses = await Courses.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
            ],
        });
        // if (!courses)
        //     return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ Courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const GetCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    if (!userId || !courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
                // TeacherId: userId,
            },
            include: [
                {
                    model: Course_Video,

                    // as: "Course_Video",
                },
                {
                    model: Course_Meets,
                    // as: "Course_Meets",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        let isEnrolled = false;
        let isReviewed = false;
        let paymentStatus = null;
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        const purcase = await Course_Purcase_Requests.findOne({
            where: {
                CourseId: courseId,
                StudentId: userId,
            },
        });
        if (purcase) {
            paymentStatus = purcase.status;
        }

        if (!student)
            return res
                .status(409)
                .json({ error: "Unauthorized , not a student" });
        const course_progress = await Course_Progress.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (course_progress) {
            isEnrolled = true;
        }
        const reviews = await Reviews.findAll({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (!reviews) {
            isReviewed = true;
        }
        const all_reviews = await Reviews.findAll({
            where: {
                CourseId: courseId,
            },
            include: [
                {
                    model: Students,
                    attributes: ["id", "FirstName", "LastName"],
                },
            ],
        });
        return res.status(200).json({
            isEnrolled: isEnrolled,
            isReviewed: isReviewed,
            paymentStatus,
            purcase,
            Course: course,
            course_progress,
            all_reviews: all_reviews,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const change_Progress = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const progress = req.body.progress;
    if (!progress)
        return res.status(409).json({ error: "progress is required." });
    else if (!userId || !courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Courses.findOne({
            where: {
                id: courseId,
                // TeacherId: userId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        if (!student)
            return res
                .status(409)
                .json({ error: "Unauthorized , not a student" });
        const Course_vedios = await Course_Video.findAll({
            where: {
                CourseId: courseId,
            },
        });
        if (!Course_vedios)
            return res.status(404).json({ error: "No vedios found." });
        else if (progress > Course_vedios.length)
            return res
                .status(409)
                .json({ error: "progress is greater than total vedios." });
        const course_progress = await Course_Progress.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (course_progress) {
            await course_progress.update({
                progress: req.body.progress,
            });
            return res.status(200).json({ message: "Progress updated." });
        } else {
            await Course_Progress.create({
                StudentId: userId,
                CourseId: courseId,
                progress: req.body.progress,
            });
            return res.status(200).json({ message: "Progress updated." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetCourse,
    Get_Courses,
    change_Progress,
};
