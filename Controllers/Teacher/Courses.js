// const  Teachers  = require("../../Models/Teacher");
// const { Teacher_Courses } = require("../../Models/Course");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Video = require("../../Models/Course_Video");

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
        return res.status(200).json({ Courses: courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
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
                TeacherId: userId,
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
        return res.status(200).json({ Course: course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const Get_Vedio = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const vedioId = req.params.vedioId;
    if (!userId || !courseId || !vedioId)
        return res.status(409).json({
            error: "Unauthorized , missing userId or courseId or vedioId",
        });
    try {
        const vedio = await Course_Video.findOne({
            where: {
                id: vedioId,
                CourseId: courseId,
            },
        });
        if (!vedio) return res.status(404).json({ error: "vedio not found." });

        return res.status(200).json({ vedio });
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

const add_course = async (req, res) => {
    if (req.decoded.userType !== "teacher") {
        return res
            .status(401)
            .json({ error: "Forbidden: only teachers can create courses." });
    }
    const userId = req.decoded.userId;
    const { Title, Description, Price, Category } = req.body;

    // Check if all required fields are present
    if (!userId || !Title || !Description || !Price || !Category) {
        return res.status(409).json({
            error: "Unauthorized: missing userId, Title, Description, Price, duration, or Category",
        });
    }

    try {
        // Create a new course
        const course = await Courses.create({
            Title: Title, // Match case with your model
            Description: Description, // Match case with your model
            Price: Price, // Match case with your model
            Category: Category, // Category is mandatory per your model
            TeacherId: userId, // Set the teacher (user) ID
        });

        // Send success response
        return res
            .status(200)
            .json({ message: "Course created successfully.", course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    GetCourses,
    DeleteCourse,
    add_course,
    GetCourse,
    Get_Vedio,
};
