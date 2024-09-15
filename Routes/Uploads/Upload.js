const express = require("express");
const router = express.Router();
const Upload_Teacher_ProfilePic = require("./ProfilePic/Teacher_ProfilePic");
const Delete_Teacher_ProfilePic = require("./ProfilePic/Teacher_ProfilePic_Delete");
const Upload_Student_ProfilePic = require("./ProfilePic/Student_ProfilePic");
const Delete_Student_ProfilePic = require("./ProfilePic/Student_ProfilePic_Delete");
const Upload_Payment_ScreenShot = require("./Payment_screenShots/Payment_screenShots");
const Delete_Payment_ScreenShot = require("./Payment_screenShots/Payment_screenShots_Delete");
const Upload_Student_PortfolioItem = require("./PortfolioItems/Portfolioitem");
const Delete_Student_PortfolioItem = require("./PortfolioItems/Portfolioitem_Delete");
const Upload_Work = require("./Work/Work");
const Student_Middlware = require("../../Middlewares/Student");
const Teacher_Middlware = require("../../Middlewares/Teacher");
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());

router.post(
    "/Teacher/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Teacher_Middlware,
    Upload_Teacher_ProfilePic
);
router.post(
    "/Student/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Upload_Student_ProfilePic
);
router.delete(
    "/Teacher/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Teacher_Middlware,
    Delete_Teacher_ProfilePic
);
router.delete(
    "/Student/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Delete_Student_ProfilePic
);

router.post(
    "/Payment",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Teacher_Middlware,
    Upload_Payment_ScreenShot
);
router.delete(
    "/Payment/:projectId",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Teacher_Middlware,
    Delete_Payment_ScreenShot
);
router.post(
    "/Work",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Student_Middlware,
    Upload_Work
);
router.post(
    "/Student/PortfolioItem",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Upload_Student_PortfolioItem
);
router.delete(
    "/Student/PortfolioItem",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Student_Middlware,
    Delete_Student_PortfolioItem
);

module.exports = router;
