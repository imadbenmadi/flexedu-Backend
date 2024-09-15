const express = require("express");
const router = express.Router();
const {
    get_Freelancer_Rooms,
    get_Client_Rooms,
    get_Freelancer_ChatRoom,
    get_Client_ChatRoom,
    post_Freelancer_Message,
    post_Client_Message,
} = require("../Controllers/Chat/chatController");
const {
    openChatRoom,
    deleteChatRoom,
} = require("../Controllers/Chat/RoomController");
const ClientMiddleware = require("../Middlewares/Teacher");
const FreelancerMiddleware = require("../Middlewares/Student");

router.get(
    "/Student/:StudentId/rooms",
    FreelancerMiddleware,
    get_Freelancer_Rooms
);
router.get("/Teacher/:TeacherId/rooms", ClientMiddleware, get_Client_Rooms);

router.get(
    "/Student/:StudentId/rooms/:roomId",
    FreelancerMiddleware,
    get_Freelancer_ChatRoom
);
router.get(
    "/Teacher/:TeacherId/rooms/:roomId",
    ClientMiddleware,
    get_Client_ChatRoom
);

router.post(
    "/Student/:StudentId/rooms/:roomId",
    FreelancerMiddleware,
    post_Freelancer_Message
);
router.post(
    "/Teacher/:TeacherId/rooms/:roomId",
    ClientMiddleware,
    post_Client_Message
);

router.post("/rooms", openChatRoom);
router.delete("/rooms/:roomId", deleteChatRoom);

module.exports = router;
