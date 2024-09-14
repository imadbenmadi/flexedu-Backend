const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = require("./Student");
const Courses = require("./Course");

const Purcase_Requests = sequelize.define("Purcase_Requests", {
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    screenShot: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Courses,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Students,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Purcase_Requests.belongsTo(Students, {
    foreignKey: "TeacherId",
    onDelete: "CASCADE",
});
Students.hasMany(Purcase_Requests, { foreignKey: "TeacherId" });

module.exports = Purcase_Requests;
