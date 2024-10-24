const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Contact_Messages = sequelize.define("Contact_Messages", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
module.exports = Contact_Messages;
