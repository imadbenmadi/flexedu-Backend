const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Courses = require("./Course");

const Course_Progress = sequelize.define(
    "Course_Progress",
    {
        StudentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Students, // Ensure the model name matches the table name
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        CourseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Courses, // Ensure the model name matches the table name
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        Course_Videos_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Set a default value if applicable
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
    },
    {
        // Custom validation to ensure Progress does not exceed Course_Videos_number
        validate: {
            progressDoesNotExceedVideosNumber() {
                if (this.Progress > this.Course_Videos_number) {
                    throw new Error(
                        "Progress cannot be greater than Course_Videos_number"
                    );
                }
            },
        },
    }
);
 
Course_Progress.belongsTo(Students, { foreignKey: "StudentId", onDelete: "CASCADE" });
Students.hasMany(Course_Progress, { foreignKey: "StudentId" });

module.exports = Course_Progress;
