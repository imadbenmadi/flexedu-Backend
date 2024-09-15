// // const  Teachers  = require("../../Models/Teacher");
// const { Projects } = require("../../../Models/Project");
// const DeleteProject = async (req, res) => {
//     const userId = req.decoded.userId;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     try {
//         // Find the Teacher by their ID
//         // const Teacher = await Teachers.findByPk(userId);
//         // if (!Teacher) {
//         //     return res.status(404).json({ error: "Teacher not found." });
//         // }
//         const { projectId } = req.params;
//         if (!projectId) {
//             return res.status(400).json({ error: "projectId is required" });
//         }
//         const project_in_db = await Projects.findOne({
//             where: {
//                 id: projectId,
//                 TeacherId: userId,
//             },
//         });
//         if (!project_in_db) {
//             return res.status(404).json({ error: "Project not found." });
//         } else if (project_in_db.TeacherId !== userId)
//             return res.status(409).json({
//                 error: "Unauthorized , you are not the owner of this project",
//             });
//         else if (
//             project_in_db.status !== "Pending" &&
//             project_in_db.status !== "Rejected"
//         )
//             return res.status(409).json({
//                 error: "You can't delete a project that has been accepted.",
//             });
//         else {
//             await Projects.destroy({
//                 where: {
//                     id: projectId,
//                     TeacherId: userId,
//                 },
//             });
//             return res
//                 .status(200)
//                 .json({ message: "Projcet deleted successfully." });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// module.exports = { DeleteProject };
