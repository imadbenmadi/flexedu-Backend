const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Students } = require("./Student");
const { Teachers } = require("./Teacher");
const Teacher_Notifications = sequelize.define("Teacher_Notifications", {
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(
            "Project_Accepted",
            "Projet_refused",
            "Freelancer_found",
            "payment_accepted",
            "payment_rejected",
            "Freelancer_uploaded_work"
        ),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Student_Notifications = sequelize.define("Student_Notifications", {
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(
            "Project_Accepted",
            "Projet_refused",
            "Freelancer_found",
            "payment_accepted",
            "payment_rejected",
            "Freelancer_uploaded_work"
        ),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unread",
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Student_Notifications.belongsTo(Students, {
    as: "student",
    foreignKey: "StudentId",
});
Students.hasMany(Student_Notifications, {
    as: "Student_Notifications",
    foreignKey: "StudentId",
});

Teacher_Notifications.belongsTo(Teachers, {
    as: "teacher",
    foreignKey: "TeacherId",
});
Teachers.hasMany(Teacher_Notifications, {
    as: "Teacher_Notifications",
    foreignKey: "TeacherId",
});
module.exports = { Student_Notifications, Teacher_Notifications };
