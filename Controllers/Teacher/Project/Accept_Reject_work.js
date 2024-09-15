// // const  Teachers  = require("../../Models/Teacher");
// const { Projects } = require("../../../Models/Project");
// const  Teachers  = require("../../../Models/Teacher");
// const { Rejection_Resons } = require("../../../Models/Rejection_Resons");
// const {
//     Student_Notifications,
//     Teacher_Notifications,
// } = require("../../../Models/Notifications");
// const { MessagesRoom } = require("../../../Models/Messages");
// const { Messages } = require("../../../Models/Messages");

// const Accept_work = async (req, res) => {
//     const userId = req.decoded.userId;
//     const projectId = req.params.projectId;
//     // const Reason = req.body.Reason;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     else if (!projectId)
//         return res
//             .status(400)
//             .json({ error: "Please provide the project ID." });
//     // else if (!Reason)
//     //     return res.status(400).json({ error: "Please provide the Reason." });
//     try {
//         // Find the Teacher by their ID
//         const Teacher = await Teachers.findByPk(userId);
//         if (!Teacher) {
//             return res.status(404).json({ error: "Teacher not found." });
//         }
//         const Project = await Projects.findByPk(projectId);
//         if (!Project) {
//             return res.status(404).json({ error: "Project not found." });
//         }
//         if (Project.TeacherId !== userId) {
//             return res.status(409).json({
//                 error: "You are not authorized to accept this project.",
//             });
//         }
//         await Project.update({
//             status: "Completed",
//             isProjectDone: true,
//             isWorkRejected: false,
//             isWorkUploaded: true,
//         });
//         try {
//             await Student_Notifications.create({
//                 title: "Work Accepted",
//                 text: "We are pleased to inform you that your work has been accepted. ower Team gonna contact you soon .",
//                 type: "Project_Accepted",
//                 StudentId: Project.StudentId,
//                 link: `/Student/Process/${projectId}`,
//             });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({ error: "Internal server error." });
//         }
//         try {
//             const room = await MessagesRoom.findOne({
//                 where: {
//                     StudentId: Project.StudentId,
//                     TeacherId: userId,
//                 },
//             });
//             await Messages.destroy({
//                 where: { roomId: room.id },
//             });
//             await MessagesRoom.destroy({
//                 where: { id: room.id },
//             });
//         } catch (error) {
//             console.log(error);
//         }

//         return res.status(200).json({ message: "Work Accepted successfully." });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };
// const Reject_work = async (req, res) => {
//     const userId = req.decoded.userId;
//     const projectId = req.params.projectId;
//     const Reason = req.body.Reason;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     else if (!projectId)
//         return res
//             .status(400)
//             .json({ error: "Please provide the project ID." });
//     else if (!Reason)
//         return res.status(400).json({ error: "Please provide the Reason." });
//     try {
//         // Find the Teacher by their ID
//         const Teacher = await Teachers.findByPk(userId);
//         if (!Teacher) {
//             return res.status(404).json({ error: "Teacher not found." });
//         }
//         const Project = await Projects.findByPk(projectId);
//         if (!Project) {
//             return res.status(404).json({ error: "Project not found." });
//         }
//         if (Project.TeacherId !== userId) {
//             return res.status(409).json({
//                 error: "You are not authorized to reject this project.",
//             });
//         }
//         await Project.update({
//             isWorkRejected: true,
//             status: "Payed",
//             isProjectDone: false,
//             isWorkUploaded: true,
//         });
//         const rejection = await Rejection_Resons.create({
//             TeacherId: userId,
//             StudentId: Project.StudentId,
//             ProjectId: projectId,
//             Reason,
//         });
//         try {
//             await Student_Notifications.create({
//                 title: "Work Refused",
//                 text: "We regret to inform you that your work has been refused by the Teacher.please check teh Rejection History for more details.",
//                 type: "payment_rejected",
//                 StudentId: Project.StudentId,
//                 link: `/Student/Process/${projectId}`,
//             });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({ error: "Internal server error." });
//         }
//         return res
//             .status(200)
//             .json({ message: "Work Rejected successfully.", rejection });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// module.exports = { Accept_work, Reject_work };
