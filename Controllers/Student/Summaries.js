const Summary = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");
const Get_Summaries = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const summarys = await Summary.findAll({
            order: [["createdAt", "DESC"]],
        });
        if (!summarys)
            return res.status(404).json({ error: "No summarys found." });
        return res.status(200).json({ Summaries: summarys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const GetSummary = async (req, res) => {
    const userId = req.decoded.userId;
    const summaryId = req.params.summaryId;
    if (!userId || !summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
                // TeacherId: userId,
            },

            order: [["createdAt", "DESC"]],
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        let paymentStatus = null;
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        const purcase = await Summary_Purcase_Requests.findOne({
            where: {
                id: summaryId,
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
            Summary: summary,
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
