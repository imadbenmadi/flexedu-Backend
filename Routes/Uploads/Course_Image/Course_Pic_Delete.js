const fs = require("fs");
const path = require("path");
const Courses = require("../../../Models/Course");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Courses_Pictures/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
});

// Upload handler
const Delete_Course_Image = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const Course = await Courses.findOne({ where: { id: userId } });
        if (!Course) {
            return res.status(404).send({
                message: "Course not found for the given userId",
            });
        }
        if (Course.Image) {
            const previousFilename = Course.Image.split("/").pop();
            const previousImagePath = `public/Courses_Pictures/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                return res.status(400).send({
                    message:
                        "Could not delete profile picture : " + error.message,
                });
            }
        } else {
            return res.status(200).send({
                message: "Profile Picture Not Found",
            });
        }
        await Courses.update({ Image: null }, { where: { id: userId } });
        // Example response
        return res.status(200).send({
            message: "Course profile picture deleted successfully!",
        });
    } catch (error) {
        // Error handling
        console.error("Error:", error);
        res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

// Export the middleware and upload handler
module.exports = [uploadMiddleware, Delete_Course_Image];
