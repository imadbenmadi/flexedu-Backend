const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");
const Students = require("../../Models/Student");
const fs = require("fs");

const Teachers = require("../../Models/Teacher");
// const {
//     Student_Feedbacks,
//     // Teacher_Feedbacks,
// } = require("../../Models/Feedbacks");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const students = await Students.findAll({
            // attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const teachers = await Teachers.findAll({
            // attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });

        // Add userType to each user object
        const StudentUsers = students.map((Student) => ({
            ...Student.toJSON(),
            userType: "student",
        }));
        const TeacherUsers = teachers.map((Teacher) => ({
            ...Teacher.toJSON(),
            userType: "teacher",
        }));

        const users = [...StudentUsers, ...TeacherUsers];

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send the combined array in the response
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Teachers/:id", adminMiddleware, async (req, res) => {
    const TeacherId = req.params.id;
    if (!TeacherId)
        return res.status(409).json({ message: "Teacher ID is required" });
    try {
        const Teacher = await Teachers.findOne({
            where: { id: TeacherId },
            // attributes: { exclude: ["password"] },
        });
        if (!Teacher)
            return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json({ user: Teacher });
    } catch (err) {
        console.error("Error fetching Teacher:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Students/:id", adminMiddleware, async (req, res) => {
    const StudentId = req.params.id;
    if (!StudentId)
        return res.status(409).json({ message: "Student ID is required" });
    try {
        const Student = await Students.findOne({
            where: { id: StudentId },
            // attributes: { exclude: ["password"] },
        });
        if (!Student)
            return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ user: Student });
    } catch (err) {
        console.error("Error fetching Student:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// router.delete("/Teacher/:id", adminMiddleware, async (req, res) => {
//     const TeacherId = req.params.id;
//     if (!TeacherId)
//         return res.status(409).json({ message: "Teacher id is required" });
//     try {
//         await Teachers.destroy({ where: { id: TeacherId } });
//         res.status(200).json({ message: "Teacher deleted successfully" });
//     } catch (err) {
//         console.error("Error fetching deleting Teacher:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });
// router.delete("/Student/:id", adminMiddleware, async (req, res) => {
//     const StudentId = req.params.id;
//     if (!StudentId)
//         return res.status(409).json({ message: "Student id is required" });
//     try {
//         await Students.destroy({ where: { id: StudentId } });
//         res.status(200).json({ message: "Student deleted successfully" });
//     } catch (err) {
//         console.error("Error fetching deleting Student:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

module.exports = router;
