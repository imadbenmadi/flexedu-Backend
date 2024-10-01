// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");
const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Get_Payment = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        let course_Purcase_Requests = [];
        const TeacherCourses = await Courses.findAll({
            where: {
                TeacherId: userId,
            },
        });
        if (TeacherCourses.length > 0) {
            course_Purcase_Requests = await Course_Purcase_Requests.findAll({
                where: {
                    CourseId: Courses.map((course) => course.id),
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
        }
        let summary_Purcase_Requests = [];
        const TeacherSummary = await Summary.findAll({
            where: {
                TeacherId: userId,
            },
        });
        if (TeacherSummary.length > 0) {
            summary_Purcase_Requests = await Summary_Purcase_Requests.findAll({
                where: {
                    SummaryId: Summary.map((summary) => summary.id),
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
        }
        return res.status(200).json({
            course_Purcase_Requests: course_Purcase_Requests,
            summary_Purcase_Requests: summary_Purcase_Requests,
            CCP_number: teacher.CCP_number,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    Get_Payment,
};
