const express = require("express");
const router = express.Router();
const Summary = require("../../Models/Course");
const Course_Video = require("../../Models/Course_Video");

const Admin_Middleware = require("../../Middlewares/Admin");
router.get("/", Admin_Middleware, async (req, res) => {
    try {
        const summarys = await Summary.findAll({
            order: [["createdAt", "DESC"]],
        });
        if (!summarys)
            return res.status(404).json({ error: "No summarys found." });
        return res.status(200).json({ Summary: summarys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    if (!summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summary.findOne({
            where: {
                id: summaryId,
            },
            include: [
                {
                    model: Course_Video,
                    // as: "Course_Video",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        return res.status(200).json({ Summary: summary });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.put("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    const { Title, Description, Price, Category } = req.body;
    if (!summaryId || !Title || !Description || !Category)
        return res.status(409).json({
            error: "Unauthorized , missing summaryId or Title or Description or Price or Category",
        });
    try {
        const summary = await Summaries.findOne({
            where: {
                id: summaryId,
            },
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        summary.Title = Title;
        summary.Description = Description;
        summary.Price = Price;
        summary.Category = Category;
        await summary.save();
        return res.status(200).json({ message: "summary updated." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.delete("/:summaryId", Admin_Middleware, async (req, res) => {
    const summaryId = req.params.summaryId;
    if (!summaryId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or summaryId" });
    try {
        const summary = await Summaries.findOne({
            where: {
                id: summaryId,
            },
        });
        if (!summary)
            return res.status(404).json({ error: "summary not found." });
        await summary.destroy();
        // We have to delete all the Vedios of this summary too
        // we have to delete the summary ownership from the students too
        // we have to delete the couse progress of the students too
        // we have to delete the reviews of this summary too
        // we have to delete the notifications of this summary too
        return res.status(200).json({ message: "summary deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
// router.delete(
//     "/:summaryId",
//     Admin_Middleware,
//     TeacherController.DeleteCourse
// );
module.exports = router;
