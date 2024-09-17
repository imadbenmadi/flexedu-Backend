// const express = require("express");
// const router = express.Router();
// const Admin_midllware = require("../../Middlewares/Admin");
// const { Op } = require("sequelize");

// const  Students  = require("../../Models/Student");
// const  Teachers  = require("../../Models/Teacher");
// const Courses = require("../../Models/Course");
// const { Applications } = require("../../Models/Applications");
// router.get("/", Admin_midllware, async (req, res) => {
//     try {
//         let Students_nbr = await Students.count({
//             where: {},
//         });
//         let Teachers_nbr = await Teachers.count({
//             where: {},
//         });
//         let projects_nbr = await Courses.count({
//             where: {
//                 status: {
//                     [Op.in]: ["Accepted", "Payed", "Completed"],
//                 },
//             },
//         });
//         // let payments = await Courses.count({
//         //     where: { status: "Payed" },
//         // });
//         // let applications = await Applications.count({
//         //     where: {},
//         // });
//         let Students = await Students.findAll({
//             where: {},
//         });
//         let Teachers = await Teachers.findAll({
//             where: {},
//         });
//         let projects = await Courses.findAll({
//             where: {
//                 status: {
//                     [Op.in]: ["Accepted", "Payed", "Completed"],
//                 },
//             },
//         });
//         if (!Students_nbr) Students_nbr = 0;
//         if (!Teachers_nbr) Teachers_nbr = 0;
//         if (!projects_nbr) projects_nbr = 0;
//         res.status(200).json({
//             Students_nbr: Students_nbr,
//             Teachers_nbr: Teachers_nbr,
//             projects_nbr: projects_nbr,
//             Students: Students,
//             Teachers: Teachers,
//             projects: projects,
//         });
//     } catch (err) {
//         console.error("Error fetching Project Applications:", err);
//         res.status(500).json({ message: err });
//     }
// });

// module.exports = router;
