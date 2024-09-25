// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");

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
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        let isEnrolled = false;
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
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

        return res.status(200).json({ Course: course, isEnrolled });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetCourse,
};
