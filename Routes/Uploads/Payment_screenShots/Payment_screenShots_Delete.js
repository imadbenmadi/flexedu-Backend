const fs = require("fs");
const path = require("path");
const Courses = require("../../../Models/Course");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Payment/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Delete handler
const deletecourseProfilePic = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const { courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).send({
                message: "User ID and course ID are required",
            });
        }
        const course = await Courses.findOne({
            where: { id: courseId },
        });

        if (!course) {
            return res.status(404).send({
                message: "course not found for the given userId",
            });
        }
        if (course.TeacherId != userId)
            return res.status(409).send({
                message: "Unauthorized: course does not belong to the user",
            });

        if (course.Pyament_ScreenShot_Link) {
            const previousFilename = path.basename(
                course.Pyament_ScreenShot_Link
            );
            const previousImagePath = path.join(
                "public/Payment/",
                previousFilename
            );

            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error("Error deleting previous image:", error);
                return res.status(400).send({
                    message:
                        "Could not delete Payment ScreenShot: " + error.message,
                });
            }

            await Courses.update(
                { Pyament_ScreenShot_Link: null },
                { where: { id: courseId } }
            );

            return res.status(200).send({
                message: "Payment ScreenShot deleted successfully!",
            });
        } else {
            return res.status(200).send({
                message: "Payment ScreenShot not found",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Error processing the request",
            error: error.message,
        });
    }
};

// Export the middleware and delete handler
module.exports = [uploadMiddleware, deletecourseProfilePic];
