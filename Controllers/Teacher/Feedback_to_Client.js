// // const  Teachers  = require("../../Models/Client");
// const { Projects } = require("../../Models/Project");
// const { Freelancer_Feedbacks } = require("../../Models/Feedbacks");
// const  Teachers  = require("../../Models/Teacher");
// const RateClient = async (req, res) => {
//     const userId = req.decoded.userId;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     const TeacherId = req.params.TeacherId;
//     const { Rate, Comment, ProjectId } = req.body;
//     if (!Rate || !Comment || !ProjectId || !TeacherId)
//         return res
//             .status(400)
//             .json({ error: "Please provide all required fields." });

//     try {
//         const project = await Projects.findByPk(ProjectId);
//         if (!project)
//             return res.status(404).json({ error: "Project not found." });
//         if (project.StudentId !== userId)
//             return res.status(409).json({
//                 error: "Unauthorized , you are not the freelancer of this project",
//             });
//         if (project.TeacherId != TeacherId)
//             return res.status(409).json({
//                 error: "Unauthorized , this Client is not the owner of this project",
//             });
//         if (project.isFreelancer_send_Feedback)
//             return res.status(409).json({
//                 error: "Unauthorized , Freelancer alredy Rate this Client",
//             });
//         const Feedback = await Freelancer_Feedbacks.create({
//             StudentId: userId,
//             TeacherId: TeacherId,
//             Rate,
//             Comment,
//             ProjectId,
//         });
//         const Client = await Teachers.findByPk(project.TeacherId);
//         if (!Client)
//             return res.status(404).json({ error: "Client not found." });
//         const newRate = (Client.Rate + Rate) / 2;
//         await Teachers.update(
//             { Rate: newRate },
//             { where: { id: project.TeacherId } }
//         );
//         await project.update(
//             {
//                 isFreelancer_send_Feedback: true,
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

// module.exports = { RateClient };
