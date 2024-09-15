const express = require("express");
const router = express.Router();
const {
    get_Student_Rooms,
    get_Teacher_Rooms,
    get_Student_ChatRoom,
    get_Teacher_ChatRoom,
    post_Student_Message,
    post_Teacher_Message,
} = require("../Controllers/Chat/chatController");
const {
    openChatRoom,
    deleteChatRoom,
} = require("../Controllers/Chat/RoomController");
const TeacherMiddleware = require("../Middlewares/Teacher");
const StudentMiddleware = require("../Middlewares/Student");

router.get("/Student/:StudentId/rooms", StudentMiddleware, get_Student_Rooms);
router.get("/Teacher/:TeacherId/rooms", TeacherMiddleware, get_Teacher_Rooms);

router.get(
    "/Student/:StudentId/rooms/:roomId",
    StudentMiddleware,
    get_Student_ChatRoom
);
router.get(
    "/Teacher/:TeacherId/rooms/:roomId",
    TeacherMiddleware,
    get_Teacher_ChatRoom
);

router.post(
    "/Student/:StudentId/rooms/:roomId",
    StudentMiddleware,
    post_Student_Message
);
router.post(
    "/Teacher/:TeacherId/rooms/:roomId",
    TeacherMiddleware,
    post_Teacher_Message
);

router.post("/rooms", openChatRoom);
router.delete("/rooms/:roomId", deleteChatRoom);

module.exports = router;
