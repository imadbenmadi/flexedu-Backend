const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Students = sequelize.define("Students", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    nationalCardNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    portfolioWebsite: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    JobTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instgram_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedIn_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
});

// Define Portfolio model
const PortfolioItems = sequelize.define("PortfolioItems", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: "",
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        // defaultValue: "",
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        // defaultValue: "",
    },
    stillWorking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    livePreviewLink: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: "",
    },
    image_Link: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: "",
    },
});
const Skills = sequelize.define("Skills", {
    skill: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
});

Students.hasMany(Skills, { as: "Skills", foreignKey: "FreelancerId" });
Skills.belongsTo(Students, {
    as: "student",
    foreignKey: "FreelancerId",
});

Students.hasMany(PortfolioItems, {
    as: "PortfolioItems",
    foreignKey: "FreelancerId",
});
PortfolioItems.belongsTo(Students, {
    as: "student",
    foreignKey: "FreelancerId",
});

module.exports = {
    Students,
    PortfolioItems,
    Skills,
};
