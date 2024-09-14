const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Course = require("./Course");

const Course_Progress = sequelize.define("Course_Progress", {
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Students", // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Courses", // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    Progress: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Set a default value if applicable
    },
    // EnrollmentDate: {
    //     // Optionally track when a student enrolls
    //     type: DataTypes.DATE,
    //     allowNull: true,
    // },
});

module.exports = Course_Progress;
