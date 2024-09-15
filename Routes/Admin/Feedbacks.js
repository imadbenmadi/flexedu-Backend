// const express = require("express");
// const router = express.Router();
// const adminMiddleware = require("../../Middlewares/Admin");
// const  Students  = require("../../Models/Student");
// const  Teachers  = require("../../Models/Teacher");
// const { Projects } = require("../../Models/Project");
// const {
//     Student_Feedbacks,
//     Teacher_Feedbacks,
//     Home_Feedbacks,
// } = require("../../Models/Feedbacks");

// router.get("/Teachers", adminMiddleware, async (req, res) => {
//     try {
//         const feedbacks = await Teacher_Feedbacks.findAll({
//             where: {},
//             include: [
//                 { model: Students, as: "student" },
//                 { model: Teachers, as: "teacher" },
//             ],
//             order: [["createdAt", "DESC"]],
//         });
//         res.status(200).json({ feedbacks });
//     } catch (err) {
//         console.error("Error fetching Teacher feedbacks:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.get("/Students", adminMiddleware, async (req, res) => {
//     try {
//         const feedbacks = await Student_Feedbacks.findAll({
//             include: [
//                 { model: Students, as: "student" },
//                 { model: Teachers, as: "teacher" },
//             ],
//             where: {},
//             order: [["createdAt", "DESC"]],
//         });
//         res.status(200).json({ feedbacks });
//     } catch (err) {
//         console.error("Error fetching Student feedbacks:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.delete("/Teachers/:feedbackId", adminMiddleware, async (req, res) => {
//     try {
//         const feedbackId = req.params.feedbackId;
//         const feedback = await Teacher_Feedbacks.findOne({
//             where: { id: feedbackId },
//         });
//         if (!feedback)
//             return res.status(404).json({ message: "Feedback not found" });

//         const feedbackInHome = await Home_Feedbacks.findOne({
//             where: { id: feedbackId },
//         });
//         if (feedbackInHome)
//             await Home_Feedbacks.destroy({ where: { id: feedbackId } });

//         await Teacher_Feedbacks.destroy({ where: { id: feedbackId } });
//         res.status(200).json({ message: "Feedback deleted successfully" });
//     } catch (err) {
//         console.error("Error deleting Teacher feedback:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.delete("/Students/:feedbackId", adminMiddleware, async (req, res) => {
//     try {
//         const feedbackId = req.params.feedbackId;
//         const feedback = await Student_Feedbacks.findOne({
//             where: { id: feedbackId },
//         });
//         if (!feedback)
//             return res.status(404).json({ message: "Feedback not found" });

//         const feedbackInHome = await Home_Feedbacks.findOne({
//             where: { id: feedbackId },
//         });
//         if (feedbackInHome)
//             await Home_Feedbacks.destroy({ where: { id: feedbackId } });

//         await Student_Feedbacks.destroy({ where: { id: feedbackId } });
//         res.status(200).json({ message: "Feedback deleted successfully" });
//     } catch (err) {
//         console.error("Error deleting Student feedback:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.post(
//     "/Home_Feedbacks/Teacher/:feedbackId",
//     adminMiddleware,
//     async (req, res) => {
//         try {
//             const feedbackId = req.params.feedbackId;
//             const feedback = await Teacher_Feedbacks.findOne({
//                 where: { id: feedbackId },
//             });
//             if (!feedback)
//                 return res.status(404).json({ message: "Feedback not found" });

//             // const alreadyExistInHomepage = await Home_Feedbacks.findOne({
//             //     where: { FeedbackId: feedbackId },
//             // });
//             // if (alreadyExistInHomepage)
//             //     return res
//             //         .status(409)
//             //         .json({ message: "Feedback already exists on homepage" });

//             const Teacher = await Teachers.findOne({
//                 where: { id: feedback.TeacherId },
//             });
//             if (!Teacher)
//                 return res.status(404).json({ message: "Teacher not found" });

//             const newFeedback = await Home_Feedbacks.create({
//                 FeedbackId: feedbackId,
//                 image_link: Teacher.profile_pic_link,
//                 full_user_name: `${Teacher.firstName} ${Teacher.lastName}`,
//                 Rate: feedback.Rate,
//                 Comment: feedback.Comment,
//                 userType: "teacher",
//             });

//             await Teacher_Feedbacks.update(
//                 { inHome: true },
//                 { where: { id: feedbackId } }
//             );
//             res.status(200).json({
//                 message: "Feedback added to homepage successfully",
//                 feedback: newFeedback,
//             });
//         } catch (err) {
//             console.error("Error adding Teacher feedback to homepage:", err);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );

// router.post(
//     "/Home_Feedbacks/Student/:feedbackId",
//     adminMiddleware,
//     async (req, res) => {
//         try {
//             const feedbackId = req.params.feedbackId;
//             const feedback = await Student_Feedbacks.findOne({
//                 where: { id: feedbackId },
//             });
//             if (!feedback)
//                 return res.status(404).json({ message: "Feedback not found" });

//             // const alreadyExistInHomepage = await Home_Feedbacks.findOne({
//             //     where: { FeedbackId: feedbackId },
//             // });
//             // if (alreadyExistInHomepage)
//             //     return res
//             //         .status(409)
//             //         .json({ message: "Feedback already exists on homepage" });

//             const Student = await Students.findOne({
//                 where: { id: feedback.StudentId },
//             });
//             if (!Student)
//                 return res
//                     .status(404)
//                     .json({ message: "Student not found" });

//             const newFeedback = await Home_Feedbacks.create({
//                 FeedbackId: feedbackId,
//                 image_link: Student.profile_pic_link,
//                 full_user_name: `${Student.firstName} ${Student.lastName}`,
//                 Rate: feedback.Rate,
//                 Comment: feedback.Comment,
//                 userType: "student",
//             });
//             // console.log(newFeedback);
//             await Student_Feedbacks.update(
//                 { inHome: true },
//                 { where: { id: feedbackId } }
//             );
//             res.status(200).json({
//                 message: "Feedback added to homepage successfully",
//                 feedback: newFeedback,
//             });
//         } catch (err) {
//             console.error("Error adding Student feedback to homepage:", err);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );

// router.delete(
//     "/Home_Feedbacks/:feedbackId",
//     adminMiddleware,
//     async (req, res) => {
//         try {
//             const feedbackId = req.params.feedbackId;
//             const feedback = await Home_Feedbacks.findOne({
//                 where: { id: feedbackId },
//             });
//             if (!feedback)
//                 return res.status(404).json({ message: "Feedback not found" });

//             if (feedback.userType === "teacher") {
//                 await Teacher_Feedbacks.update(
//                     { inHome: false },
//                     { where: { id: feedback.FeedbackId } }
//                 );
//             } else if (feedback.userType === "student") {
//                 await Student_Feedbacks.update(
//                     { inHome: false },
//                     { where: { id: feedback.FeedbackId } }
//                 );
//             } else {
//                 return res.status(404).json({ message: "Feedback not found" });
//             }
//             await Home_Feedbacks.destroy({ where: { id: feedbackId } });
//             res.status(200).json({ message: "Feedback deleted successfully" });
//         } catch (err) {
//             console.error("Error deleting homepage feedback:", err);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );

// module.exports = router;
