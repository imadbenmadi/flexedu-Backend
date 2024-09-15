const { getProfile } = require("./Teacher/Profle/getProfile");
const { EditeProfile } = require("./Teacher/Profle/EditeProfile");
const { AddProject } = require("./Teacher/Project/AddProject");
const { DeleteProject } = require("./Teacher/Project/DeleteProject");
const { GetProjcts } = require("./Teacher/Project/GetProjects");
const { GetProject } = require("./Teacher/Project/GetProject");
const { PaymentStatus } = require("./Teacher/Project/PaymentStatus");
const { GetProcess } = require("./Teacher/Project/GetProcess");
const { GetRejections } = require("./Teacher/Project/GetRejection");
const { GetNotifications } = require("./Teacher/Notifications");
const { DeleteNotification } = require("./Teacher/Notifications");
const {
    Accept_work,
    Reject_work,
} = require("./Teacher/Project/Accept_Reject_work");

const { RateFreealncer } = require("./Teacher/Feedback_to_Freealncer");
const { GetFeedbacks } = require("./Teacher/GetFeedbacks");
const ClientController = {
    getProfile,
    EditeProfile,
    AddProject,
    DeleteProject,
    GetProjcts,
    GetProject,
    PaymentStatus,
    GetProcess,
    Accept_work,
    Reject_work,
    GetRejections,
    GetNotifications,
    DeleteNotification,
    RateFreealncer,
    GetFeedbacks,
};

module.exports = ClientController;
