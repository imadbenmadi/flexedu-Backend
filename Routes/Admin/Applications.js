// const express = require("express");
// const router = express.Router();
// const { Projects } = require("../../Models/Project");
// const Admin_midllware = require("../../Middlewares/Admin");
// const { Applications } = require("../../Models/Applications");
// const  Teachers  = require("../../Models/Teacher");
// const  Students  = require("../../Models/Student");
// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require("sequelize");
// const { MessagesRoom } = require("../../Models/Messages");

// const {
//     Student_Notifications,
//     Teacher_Notifications,
// } = require("../../Models/Notifications");
// router.get("/", Admin_midllware, async (req, res) => {
//     try {
//         // Fetch projects with their associated applications and client (company name)
//         const projects = await Projects.findAll({
//             where: {
//                 status: "accepted",
//                 StudentId: null,
//             },
//             include: [
//                 {
//                     model: Applications,
//                     as: "Applications",
//                     attributes: [],
//                 },
//                 {
//                     model: Teachers,
//                     as: "owner",
//                     attributes: ["company_Name"], // Assuming "name" is the client's company name
//                 },
//             ],
//             attributes: {
//                 include: [
//                     [
//                         Sequelize.fn("COUNT", Sequelize.col("Applications.id")),
//                         "applicationsCount",
//                     ],
//                 ],
//             },
//             group: ["Projects.id", "owner.id"],
//             order: [["createdAt", "DESC"]],
//         });

//         // Prepare the data to send
//         const data_to_send = projects.map((project) => ({
//             id: project.id,
//             title: project.Title,
//             createdAt: project.createdAt,
//             companyName: project.owner.company_Name,
//             applicationsCount: project.dataValues.applicationsCount,
//         }));

//         res.status(200).json({ projects: data_to_send });
//     } catch (err) {
//         console.error("Error fetching Project Applications:", err);
//         res.status(500).json({ message: err });
//     }
// });
// router.get("/:projectId", Admin_midllware, async (req, res) => {
//     const projectId = req.params.projectId;
//     if (!projectId)
//         return res
//             .status(409)
//             .json({ message: "Missing data ProjectId is required" });
//     try {
//         const applications = await Applications.findAll({
//             where: {
//                 ProjectId: projectId,
//             },
//             include: [
//                 {
//                     model: Projects,
//                     as: "Project",
//                     include: [{ model: Teachers, as: "owner" }],
//                 },
//                 { model: Students, as: "student" },
//             ],
//             order: [["createdAt", "DESC"]],
//         });
//         // console.log("applications : ", applications);
//         res.status(200).json({ Applications: applications });
//     } catch (err) {
//         console.error("Error fetching Project Applications:", err);
//         res.status(500).json({ message: err });
//     }
// });

// router.get("/:projectId/:ApplicationId", Admin_midllware, async (req, res) => {
//     const projectId = req.params.projectId;
//     const ApplicationId = req.params.ApplicationId;
//     if (!projectId)
//         return res
//             .status(409)
//             .json({ message: "Missing data ProjectId is required" });
//     else if (!ApplicationId)
//         return res
//             .status(409)
//             .json({ message: "Missing data ApplicationId is required" });
//     try {
//         const applications = await Applications.findOne({
//             where: {
//                 // status: "Pending",
//                 ProjectId: projectId,
//                 id: ApplicationId,
//             },
//         });
//         res.status(200).json({ Application: applications });
//     } catch (err) {
//         console.error("Error fetching Project Applications:", err);
//         res.status(500).json({ message: err });
//     }
// });

// router.post(
//     "/:projectId/:StudentId/accept",
//     Admin_midllware,
//     async (req, res) => {
//         const { projectId, StudentId } = req.params;
//         const Money = req.body.Money;
//         const DeadLine = req.body.DeadLine;
//         if (!Money)
//             return res
//                 .status(409)
//                 .json({ message: "Missing data Money is required" });
//         if (!DeadLine)
//             return res
//                 .status(409)
//                 .json({ message: "Missing data DeadLine is required" });
//         if (!projectId) {
//             return res
//                 .status(409)
//                 .json({ message: "Missing data: ProjectId is required" });
//         }

//         if (!StudentId) {
//             return res
//                 .status(409)
//                 .json({ message: "Missing data: StudentId is required" });
//         }

//         try {
//             const application = await Applications.findOne({
//                 where: { ProjectId: projectId, StudentId: StudentId },
//             });
//             if (!application) {
//                 return res
//                     .status(404)
//                     .json({ message: "Application not found" });
//             }

//             const project = await Projects.findOne({
//                 where: { id: projectId },
//             });

//             if (!project) {
//                 return res.status(404).json({ message: "Project not found" });
//             }

//             await Applications.update(
//                 { status: "Accepted" },
//                 { where: { StudentId: StudentId, ProjectId: projectId } }
//             );

//             await Projects.update(
//                 {
//                     StudentId: application.StudentId,
//                     Money: Money,
//                     DeadLine: DeadLine,
//                 },
//                 { where: { id: projectId } }
//             );
//             try {
//                 await Student_Notifications.create({
//                     title: "Application accepted",
//                     text: "Your Application to the project have been accepted . we are waiting the Client Payment to start the project",
//                     type: "Project_Accepted",
//                     StudentId: application.StudentId,
//                     link: `/Student/Process/${project.id}`,
//                 });
//                 await Teacher_Notifications.create({
//                     title: "Freelancer Found",
//                     text: "Pay the fees so the freelancer can start working",
//                     type: "Freelancer_found",
//                     TeacherId: project.TeacherId,
//                     link: `/Teacher/Projects/${project.id}`,
//                 });
//             } catch (error) {
//                 return res.status(500).json({ error: error.message });
//             }
//             try {
//                 const TeacherId = project.TeacherId;
//                 let newRoom;
//                 if (TeacherId) {
//                     const existingRoom = await MessagesRoom.findOne({
//                         where: {
//                             StudentId: StudentId,
//                             TeacherId: TeacherId,
//                         },
//                     });
//                     if (!existingRoom) {
//                         newRoom = await MessagesRoom.create({
//                             StudentId: StudentId,
//                             TeacherId: TeacherId,
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }

//             res.status(200).json({ message: "Application Approved" });
//         } catch (err) {
//             console.error("Error processing application approval:", err);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );
// router.post(
//     "/:projectId/:StudentId/Reject",
//     Admin_midllware,
//     async (req, res) => {
//         const projectId = req.params.projectId;
//         const StudentId = req.params.StudentId;
//         if (!projectId)
//             return res
//                 .status(409)
//                 .json({ message: "Missing data ProjectId is required" });
//         else if (!StudentId)
//             return res
//                 .status(409)
//                 .json({ message: "Missing data StudentId is required" });
//         try {
//             const application = await Applications.findOne({
//                 where: {
//                     // status: "Pending",
//                     ProjectId: projectId,
//                     StudentId: StudentId,
//                 },
//             });
//             if (!application)
//                 return res
//                     .status(404)
//                     .json({ message: "Application not found" });

//             await Applications.update(
//                 {
//                     status: "Rejected",
//                 },
//                 { where: { StudentId: StudentId, ProjectId: projectId } }
//             );

//             res.status(200).json({ message: "Application Rejected" });
//         } catch (err) {
//             console.error("Error fetching Project Applications:", err);
//             res.status(500).json({ message: err });
//         }
//     }
// );

// module.exports = router;
