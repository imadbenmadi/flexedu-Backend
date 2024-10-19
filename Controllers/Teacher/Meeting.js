const { Teacher_Notifications } = require("../../Models/Notifications");
const Courses = require("../../Models/Course");
const Course_Meets = require("../../Models/Course_Meets");
const Students = require("../../Models/Student");
const Course_Progress = require("../../Models/Course_Progress");
const Course_Purcase_Requests = require("../../Models/Course_Purcase_Requests");
const Course_Video = require("../../Models/Course_Video");
const { Op } = require("sequelize");
const path = require("path");

// Controller to get all meetings for a course
const GetMeetings = async (req, res) => {
    const { courseId } = req.params;
    try {
        const meetings = await Course_Meets.findAll({
            where: { CourseId: courseId },
        });
        if (!meetings) {
            return res
                .status(404)
                .json({ message: "No meetings found for this course." });
        }
        res.json(meetings);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch meetings.",
            error: error.message,
        });
    }
};

// Controller to get a specific meeting by ID
const GetMeeting = async (req, res) => {
    const { meetingId } = req.params;
    try {
        const meeting = await Course_Meets.findOne({
            where: { id: meetingId },
        });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found." });
        }
        res.json(meeting);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch the meeting.",
            error: error.message,
        });
    }
};

// Controller to add a new meeting
const AddMeeting = async (req, res) => {
    const { courseId } = req.params;
    const { Link } = req.body;

    try {
        const course = await Courses.findOne({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }
        const newMeeting = await Course_Meets.create({
            Link,
            CourseId: courseId,
        });
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create meeting.",
            error: error.message,
        });
    }
};

// Controller to delete a meeting
const DeleteMeeting = async (req, res) => {
    const { meetingId } = req.params;

    try {
        const meeting = await Course_Meets.findOne({
            where: { id: meetingId },
        });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found." });
        }
        await meeting.destroy();
        res.status(200).json({ message: "Meeting deleted successfully." });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete meeting.",
            error: error.message,
        });
    }
};

module.exports = {
    GetMeetings,
    GetMeeting,
    AddMeeting,
    DeleteMeeting,
};
