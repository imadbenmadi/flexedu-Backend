const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Teachers = require("./Teacher");

const Course = sequelize.define("Course", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Teachers", // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Course.belongsTo(Teachers, { foreignKey: "TeacherId", onDelete: "CASCADE" });
Teachers.hasMany(Course, { foreignKey: "TeacherId" });

module.exports = Course;
