const { Messages } = require("../../Models/Messages");
const { Students } = require("../../Models/Student");
const { Teachers } = require("../../Models/Teacher");
const { MessagesRoom } = require("../../Models/Messages");

const openChatRoom = async (req, res) => {
    try {
        const { StudentId, TeacherId } = req.body;

        // Validate StudentId and TeacherId
        if (!StudentId || !TeacherId) {
            return res
                .status(400)
                .json({ error: "Freelancer ID and Client ID are required" });
        } else if (isNaN(StudentId) || isNaN(TeacherId)) {
            return res
                .status(400)
                .json({ error: "Freelancer ID and Client ID must be numbers" });
        }

        // Check if the freelancer exists
        const freelancer = await Students.findByPk(StudentId);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }

        // Check if the client exists
        const client = await Teachers.findByPk(TeacherId);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Check if the chat room already exists
        const existingRoom = await MessagesRoom.findOne({
            where: {
                StudentId: StudentId,
                TeacherId: TeacherId,
            },
        });

        if (existingRoom) {
            return res.status(400).json({ error: "Chat room already exists" });
        }

        // Create a new chat room
        const newRoom = await MessagesRoom.create({
            StudentId: StudentId,
            TeacherId: TeacherId,
        });

        res.status(200).json(newRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteChatRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Validate roomId
        if (!roomId) {
            return res.status(400).json({ error: "Room ID is required" });
        } else if (isNaN(roomId)) {
            return res.status(400).json({ error: "Room ID must be a number" });
        }

        // Check if the chat room exists
        const chatRoom = await MessagesRoom.findByPk(roomId);
        if (!chatRoom) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        // Delete all messages in the chat room
        await Messages.destroy({
            where: { roomId: roomId },
        });

        // Delete the chat room
        await MessagesRoom.destroy({
            where: { id: roomId },
        });

        res.status(200).json({
            message: "Chat room and all messages deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = { openChatRoom, deleteChatRoom };
