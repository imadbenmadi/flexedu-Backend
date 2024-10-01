const Courses = require("../../Models/Course");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");

const Reviews = require("../../Models/Review");

const post_review = async (req, res) => {
    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const { rating, review } = req.body;
    if (!userId || !courseId || !rating || !review)
        return res
            .status(409)
            .json({
                error: "Unauthorized , missing userId or courseId or rating or review",
            });
    try {
        const student = await Students.findOne({
            where: {
                id: userId,
            },
        });
        if (!student)
            return res.status(404).json({ error: "Student not found." });
        const course = await Courses.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course)
            return res.status(404).json({ error: "Course not found." });
        const course_progress = await Course_Progress.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (!course_progress)
            return res.status(404).json({ error: "Course not found." });
        const already_reviewed = await Reviews.findOne({
            where: {
                StudentId: userId,
                CourseId: courseId,
            },
        });
        if (already_reviewed)
            return res.status(404).json({ error: "Review already exists." });

        const review_data = await Reviews.create({
            StudentId: userId,
            CourseId: courseId,
            rating: rating,
            review: review,
        });
        if (!review_data)
            return res.status(404).json({ error: "Review not created." });
        return res.status(200).json({ Review: review_data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    post_review,
};
