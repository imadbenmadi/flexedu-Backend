const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Teachers = require("./Teacher");
const Students = require("./Student");

const Reviews = sequelize.define("Reviews", {
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Teachers,
            key: "id",
        },
        onDelete: "CASCADE", // Ensure cascading deletes if a teacher is deleted
        onUpdate: "CASCADE", // If teacher's id changes, update references
    },
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Students,
            key: "id",
        },
        onDelete: "CASCADE", // Ensure cascading deletes if a student is deleted
        onUpdate: "CASCADE", // If student's id changes, update references
    },
    Comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
});

// Setting up associations with Teachers and Students
Reviews.belongsTo(Teachers, { foreignKey: "TeacherId", onDelete: "CASCADE" });
Teachers.hasMany(Reviews, { foreignKey: "TeacherId" });

Reviews.belongsTo(Students, { foreignKey: "StudentId", onDelete: "CASCADE" });
Students.hasMany(Reviews, { foreignKey: "StudentId" });

module.exports =  Reviews ;
