// // const  Teachers  = require("../../Models/Teacher");
// const Teachers = require("../../../Models/Teacher");
// const Students = require("../../../Models/Student");
// // const { Projects } = require("../../../Models/Project");
// const GetProject = async (req, res) => {
//     const projectId = req.params.projectId;
//     const userId = req.decoded.userId;
//     if (!userId)
//         return res.status(401).json({ error: "Unauthorized , missing userId" });
//     try {
//         const project = await Projects.findOne({
//             where: {
//                 id: projectId,
//                 TeacherId: userId,
//             },
//             // include: [
//             //     {
//             //         model: Students,
//             //         as: "student",
//             //         required: false,
//             //     },
//             //     {
//             //         model: Teachers,
//             //         as: "owner",
//             //     },
//             // ],
//         });
//         return res.status(200).json({ Project: project });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// module.exports = { GetProject };
