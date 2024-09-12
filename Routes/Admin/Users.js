const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");
const { Students } = require("../../Models/Student");
const { PortfolioItems } = require("../../Models/Student");
const { Skills } = require("../../Models/Student");

const { Teachers } = require("../../Models/Teacher");
const {
    Freelancer_Feedbacks,
    Client_Feedbacks,
} = require("../../Models/Feedbacks");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const Students = await Students.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const Teachers = await Teachers.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });

        // Add userType to each user object
        const freelancerUsers = Students.map((freelancer) => ({
            ...freelancer.toJSON(),
            userType: "student",
        }));
        const clientUsers = Teachers.map((client) => ({
            ...client.toJSON(),
            userType: "teacher",
        }));

        const users = [...freelancerUsers, ...clientUsers];

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send the combined array in the response
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Teachers/:id", adminMiddleware, async (req, res) => {
    const clientId = req.params.id;
    if (!clientId)
        return res.status(409).json({ message: "Client ID is required" });
    try {
        const client = await Teachers.findOne({
            where: { id: clientId },
            attributes: { exclude: ["password"] },
        });
        if (!client)
            return res.status(404).json({ message: "Client not found" });
        res.status(200).json({ user: client });
    } catch (err) {
        console.error("Error fetching client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Students/:id", adminMiddleware, async (req, res) => {
    const freelancerId = req.params.id;
    if (!freelancerId)
        return res.status(409).json({ message: "Freelancer ID is required" });
    try {
        const freelancer = await Students.findOne({
            where: { id: freelancerId },
            include: [
                { model: PortfolioItems, as: "PortfolioItems" },
                { model: Skills, as: "Skills" },
            ],
            attributes: { exclude: ["password"] },
        });
        if (!freelancer)
            return res.status(404).json({ message: "Freelancer not found" });
        res.status(200).json({ user: freelancer });
    } catch (err) {
        console.error("Error fetching freelancer:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Students/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Client_Feedbacks.findAll({
            where: {
                FreelancerId: userId,
            },
            include: [
                { model: Students, as: "student" },
                { model: Teachers, as: "teacher" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/Teachers/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Freelancer_Feedbacks.findAll({
            where: {
                ClientId: userId,
            },
            include: [
                { model: Students, as: "student" },
                { model: Teachers, as: "teacher" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

router.delete("/Client/:id", adminMiddleware, async (req, res) => {
    const clientId = req.params.id;
    if (!clientId)
        return res.status(409).json({ message: "client id is required" });
    try {
        await Teachers.destroy({ where: { id: clientId } });
        res.status(200).json({ message: "client deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Freelancer/:id", adminMiddleware, async (req, res) => {
    const freelancerId = req.params.id;
    if (!freelancerId)
        return res.status(409).json({ message: "Freelancer id is required" });
    try {
        await Students.destroy({ where: { id: freelancerId } });
        res.status(200).json({ message: "Freelancer deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Freelancer:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
