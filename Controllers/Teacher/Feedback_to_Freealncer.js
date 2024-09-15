// // const  Teachers  = require("../../Models/Teacher");
// const { Projects } = require("../../Models/Project");
// const { Teacher_Feedbacks } = require("../../Models/Feedbacks");
// const  Students  = require("../../Models/Student");
// const RateFreealncer = async (req, res) => {
//     const userId = req.decoded.userId;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     const StudentId = req.params.StudentId;
//     const { Rate, Comment, ProjectId } = req.body;
//     if (!Rate || !Comment || !ProjectId || !StudentId)
//         return res
//             .status(400)
//             .json({ error: "Please provide all required fields." });
//     try {
//         const project = await Projects.findByPk(ProjectId);
//         if (!project)
//             return res.status(404).json({ error: "Project not found." });
//         if (project.TeacherId !== userId)
//             return res.status(409).json({
//                 error: "Unauthorized , you are not the owner of this project",
//             });
//         if (project.StudentId != StudentId)
//             return res.status(409).json({
//                 error: "Unauthorized , this Student is not working on this project",
//             });
//         if (project.isCleint_send_Feedback)
//             return res.status(409).json({
//                 error: "Unauthorized ,Teacher  alredy Rate this Student",
//             });
//         const Student = await Students.findByPk(project.StudentId);
//         if (!Student)
//             return res.status(404).json({ error: "Student not found." });
//         const newRate = (Student.Rate + Rate) / 2;
//         await Students.update(
//             { Rate: newRate },
//             { where: { id: project.StudentId } }
//         );
//         const Feedback = await Teacher_Feedbacks.create({
//             StudentId: StudentId,
//             TeacherId: userId,
//             Rate,
//             Comment,
//             ProjectId,
//         });
//         await project.update(
//             {
//                 isCleint_send_Feedback: true,
//                 isWorkUploaded: true,
//                 status: "Completed",
//             },
//             {
//                 where: {
//                     id: ProjectId,
//                     TeacherId: project.TeacherId,
//                     StudentId: project.StudentId,
//                 },
//             }
//         );
//         return res
//             .status(200)
//             .json({ message: "Feedback Created successfully", Feedback });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// module.exports = { RateFreealncer };
