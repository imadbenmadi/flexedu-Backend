const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Get_Summaries = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const courses = await Summary.findAll({
            where: {
                TeacherId: userId,
            },

            order: [["createdAt", "DESC"]],
        });
        if (!courses)
            return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ Summaries: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const GetSummary = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    if (!userId || !courseId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or courseId" });
    try {
        const course = await Summary.findOne({
            where: {
                id: courseId,
                // TeacherId: userId,
            },

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
        const purcase = await Summary_Purcase_Requests.findOne({
            where: {
                SummaryId: courseId,
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

        return res.status(200).json({
            paymentStatus,
            purcase,
            Summary: course,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetSummary,
    Get_Summaries,
};
