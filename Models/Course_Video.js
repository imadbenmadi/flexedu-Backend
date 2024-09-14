const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Course = require("./Course");

const Course_Video = sequelize.define("Course_Video", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Video: {
        type: DataTypes.STRING,
        allowNull: false,
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
});

Course_Video.belongsTo(Course, { foreignKey: "CourseId", onDelete: "CASCADE" });
Course.hasMany(Course_Video, { foreignKey: "CourseId" });

module.exports = Course_Video;
