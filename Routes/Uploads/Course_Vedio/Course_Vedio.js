const fs = require("fs");
const path = require("path");
const Courses = require("../../../Models/Course");
const Course_Video = require("../../../Models/Course_Video");
const formidableMiddleware = require("express-formidable");

const uploadMiddleware = formidableMiddleware({
    uploadDir: "public/Courses_Videos/",
    keepExtensions: true,
    multiples: false,
    maxFileSize: 500 * 1024 * 1024, // 500 MB for video upload
});

const Upload_Course_Vedio = async (req, res) => {
    try {
        const { CourseVedio } = req.files;
        if (!CourseVedio) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;
        const { Title, Duration } = req.body; // Assuming title and description are passed with the request

        if (!userId) {
            return res.status(400).send({
                message: "User ID is required",
            });
        }

        const allowedTypes = ["video/mp4", "video/avi", "video/mkv"];
        if (!allowedTypes.includes(CourseVedio.type)) {
            throw new Error("Only MP4, AVI, and MKV videos are allowed!");
        }

        const fileExtension = path.extname(CourseVedio.name).toLowerCase();
        if (![".mp4", ".avi", ".mkv"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }

        const uniqueSuffix = `Course-${userId}-${
            req.params.courseId
        }-${Date.now()}${fileExtension}`;
        const fileLink = `/Courses_Videos/${uniqueSuffix}`;

        // Move the video file to the desired location
        const targetPath = path.join("public/Courses_Videos/", uniqueSuffix);
        fs.copyFileSync(CourseVedio.path, targetPath);
        fs.unlinkSync(CourseVedio.path);

        // Update the course with the video link and details in the Course_Video table
        const course = await Courses.findOne({ where: { id: userId } });

        await Course_Video.create({
            Title,
            Duration,
            Video: fileLink,
            CourseId: course.id,
        });
        
        

        // Increment video number in the Courses model
        // await Courses.update(
        //     { Vedio_Number: course.Vedio_Number + 1 },
        //     { where: { id: course.id } }
        // );

        res.status(200).send({
            message: "Video uploaded successfully!",
            fileLink,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Error processing the uploaded file",
            error: error.message,
        });
    }
};

module.exports = [uploadMiddleware, Upload_Course_Vedio];
