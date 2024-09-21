// const  Teachers  = require("../../Models/Teacher");
// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");

const GetCourses = async (req, res) => {
    const userId = req.decoded.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized , missing userId" });
    try {
        const courses = await Courses.findAll({
            where: {
                TeacherId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        if (!courses)
            return res.status(404).json({ error: "No courses found." });
        return res.status(200).json({ courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const DeleteCourse = async (req, res) => {
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
                TeacherId: userId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "course not found." });
        await course.destroy();
        // We have to delete all the Vedios of this course too
        // we have to delete the course ownership from the students too
        // we have to delete the couse progress of the students too
        // we have to delete the reviews of this course too
        // we have to delete the notifications of this course too
        return res.status(200).json({ message: "course deleted." });
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
