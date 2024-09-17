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

// Upload handler
const Upload_Payment_ScreenShot = async (req, res) => {
    try {
        const { image } = req.files;
        if (!image) {
            return res.status(400).send({
                message: "No file uploaded",
            });
        }
        const userId = req.decoded.userId;
        const { courseId, CCP_number } = req.body;

        if (!userId || !courseId || !CCP_number) {
            return res.status(400).send({
                message: "Messing data ",
            });
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image.name).toLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        const uniqueSuffix = `Payment-${userId}-${courseId}-${Date.now()}${fileExtension}`;

        const fileLink = `/Payment/${uniqueSuffix}`;
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
        else if (course.status != "Accepted" || !course.StudentId)
            return res.status(409).send({
                message:
                    "Unauthorized: course is not accepted yet or not assigned to any Student",
            });
        if (course.Pyament_ScreenShot_Link) {
            const previousFilename =
                course.Pyament_ScreenShot_Link.split("/").pop();
            const previousImagePath = `public/Payment/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error("Error deleting previous image:", error);
            }
        }
        // Move the file to the desired location
        // fs.renameSync(image.path, path.join("public/Payment/", uniqueSuffix));
        const targetPath = path.join("public/Payment/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
        // Update database with file link
        await Courses.update(
            {
                Pyament_ScreenShot_Link: fileLink,
                Teacher_CCP_number: CCP_number,
                isPayment_ScreenShot_uploaded: true,
                isPayment_ScreenShot_Rejected: false,
            },
            { where: { id: courseId } }
        );

        // Example response
        res.status(200).send({
            message: "Payment ScreenShot uploaded successfully!",
            fileLink,
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
module.exports = [uploadMiddleware, Upload_Payment_ScreenShot];
