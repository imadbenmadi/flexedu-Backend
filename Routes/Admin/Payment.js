const express = require("express");
const router = express.Router();
const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Teachers = require("../../Models/Teacher");
const Admin_midllware = require("../../Middlewares/Admin");
const { Op } = require("sequelize");

const {
    Student_Notifications,
    Teacher_Notifications,
} = require("../../Models/Notifications");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        const courses = await Courses.findAll({
            // where: { status: "Pending" },
            // where: { isPayment_ScreenShot_uploaded: true },
            where: {
                status: {
                    [Op.notIn]: ["Rejected", "Completed", "Pending", "Payed"],
                },
                StudentId: { [Op.not]: null },
            },
            include: [
                { model: Teachers, as: "owner" },
                { model: Students, as: "student" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/:courseId", Admin_midllware, async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res
            .status(409)
            .json({ message: "Missing data CourseId is required" });

    try {
        const course = await Courses.findOne({
            // where: { status: "Pending" },
            // where: { isPayment_ScreenShot_uploaded: true },
            where: {
                id: courseId,
                status: {
                    [Op.notIn]: ["Rejected", "Completed", "Pending", "Payed"],
                },
                StudentId: { [Op.not]: null },
            },
            include: [
                { model: Teachers, as: "owner" },
                { model: Students, as: "student" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ course: course });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});
router.get("/Accepted", Admin_midllware, async (req, res) => {
    try {
        const courses = await Courses.findAll({
            // where: { status: "Pending" },
            where: {
                isPayment_ScreenShot_uploaded: true,
                status: "Payed",
                isPayment_ScreenShot_Rejected: false,
            },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.error("Error fetching Course courses:", err);
        res.status(500).json({ message: err });
    }
});

// router.get("/:courseId", Admin_midllware, async (req, res) => {
//     const courseId = req.params.courseId;
//     if (!courseId)
//         return res
//             .status(409)
//             .json({ message: "Missing data CourseId is required" });
//     try {
//         const courses = await Courses.findOne({
//             where: {
//                 // status: "Pending",
//                 CourseId: courseId,
//             },
//             order: [["createdAt", "DESC"]],
//         });
//         res.status(200).json({ courses: courses });
//     } catch (err) {
//         console.error("Error fetching Course courses:", err);
//         res.status(500).json({ message: err });
//     }
// });

router.post("/:courseId/Accept", Admin_midllware, async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res
            .status(409)
            .json({ message: "Missing data: CourseId is required" });
    }

    try {
        const course = await Courses.findOne({
            where: { id: courseId },
        });
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        } else if (
            course.status !== "Accepted" ||
            !course.isPayment_ScreenShot_uploaded ||
            !course.StudentId
        ) {
            return res.status(409).json({
                message:
                    "unauthorized , payment not uploaded or course not accepted or Student not assigned",
            });
        }
        await Courses.update(
            { status: "Payed", isPayment_ScreenShot_Rejected: false },
            { where: { id: courseId } }
        );
        try {
            await Teacher_Notifications.create({
                title: "Payment Accepted",
                text: "your payment has been successfully accepted and processed",
                type: "payment_accepted",
                TeacherId: course.TeacherId,
                link: `/Teacher/Courses/${course.id}`,
            });
            await Student_Notifications.create({
                title: "Teacher payed the fees",
                text: "We are pleased to inform you that the Teacher has paid the fees, and you may now begin working on the course.",
                type: "payment_accepted",
                StudentId: course.StudentId,
                link: `/Student/Process/${course.id}`,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "course payment accepted" });
    } catch (err) {
        console.error("Error processing course payment approval:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/:courseId/Reject", Admin_midllware, async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res
            .status(409)
            .json({ message: "Missing data: CourseId is required" });
    }

    try {
        const course = await Courses.findOne({
            where: { id: courseId },
        });
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        } else if (
            course.status !== "Accepted" ||
            !course.isPayment_ScreenShot_uploaded ||
            !course.StudentId
        ) {
            return res.status(409).json({
                message:
                    "unauthorized , payment not uploaded or course not accepted or Student not assigned",
            });
        }
        await Courses.update(
            {
                isPayment_ScreenShot_Rejected: true,
                status: "Accepted",
            },
            { where: { id: courseId } }
        );
        try {
            await Teacher_Notifications.create({
                title: "Payment Rejected",
                text: "We regret to inform you that your payment has been rejected, and we kindly request you to review your payment details and try again.",
                type: "payment_rejected",
                TeacherId: course.TeacherId,
                link: `/Teacher/Courses/${course.id}`,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: "course payment Rejected" });
    } catch (err) {
        console.error("Error processing course payment approval:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
