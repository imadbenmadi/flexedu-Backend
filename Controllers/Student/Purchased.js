// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");
const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const GetPurchased = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        let course_Purcase_Requests = [];
        course_Purcase_Requests = await Course_Purcase_Requests.findAll({
            where: {
                StudentId: userId,
                status: "accepted",
            },
            include: [
                {
                    model: Courses,
                    // as: "Course_Video",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        let summary_Purcase_Requests = [];
        summary_Purcase_Requests = await Summary_Purcase_Requests.findAll({
            where: {
                StudentId: userId,
                status: "accepted",
            },
            include: [
                {
                    model: Summary,
                    // as: "Course_Video",
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
            summary_Purcase_Requests: summary_Purcase_Requests,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const GetPurchasedCourse = async (req, res) => {
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
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        let isEnrolled = false;
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

        return res.status(200).json({
            isEnrolled: isEnrolled,
            paymentStatus,
            purcase,
            Course: course,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetPurchasedCourse,
    GetPurchased,
};
