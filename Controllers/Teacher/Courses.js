// const  Teachers  = require("../../Models/Teacher");
// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const GetCourses = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const notifications = await Teacher_Notifications.findAll({
            where: {
                TeacherId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        if (!notifications)
            return res.status(404).json({ error: "No notifications found." });
        return res.status(200).json({ Notifications: notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const DeleteCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const notificationId = req.params.notificationId;
    if (!userId || !notificationId)
        return res
            .status(409)
            .json({ error: "Unauthorized , missing userId or notificationId" });
    try {
        const notification = await Teacher_Notifications.findOne({
            where: {
                id: notificationId,
                TeacherId: userId,
            },
        });
        if (!notification)
            return res.status(404).json({ error: "Notification not found." });
        await notification.destroy();
        return res.status(200).json({ message: "Notification deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const OpenCourse = async (req, res) => {
    const userId = req.decoded.userId;
    const { title, description, price, duration } = req.body;
    if (!userId || !title || !description || !price || !duration)
        return res.status(409).json({
            error: "Unauthorized , missing userId or title or description or price or duration",
        });
    try {
        // const course = await Teacher_Courses.create({
        //     title,
        //     description,
        //     price,
        //     duration,
        //     TeacherId: userId,
        // });
        return res
            .status(201)
            .json({ message: "Course created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
module.exports = { GetCourses, DeleteCourse, OpenCourse };
