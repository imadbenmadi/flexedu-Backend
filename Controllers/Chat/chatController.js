const { Messages, MessagesRoom } = require("../../Models/Messages");
const { Students } = require("../../Models/Student");
const { Teachers } = require("../../Models/Teacher");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const get_Freelancer_Rooms = async (req, res) => {
    try {
        const freelancerId = req.params.freelancerId;

        // Fetch the rooms that the freelancer is part of, including the latest message for each room
        const rooms = await MessagesRoom.findAll({
            where: {
                freelancerId: freelancerId,
            },
            include: [
                {
                    model: Teachers,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Students,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Messages,
                    // attributes: ["message"],
                    where: {
                        senderId: freelancerId,
                        senderType: "student",
                        receiverType: "teacher",
                    },
                    order: [["createdAt", "DESC"]],
                    limit: 1,
                    required: false, // This allows rooms with no messages
                },
            ],
        });

        // Format the data to include the latest message
        const chatList = rooms.map((room) => {
            const latestMessage = room.Messages[0] || {}; // Get the latest message or an empty object if no messages
            return {
                ...room.toJSON(),
                lastMessage: latestMessage || "No messages yet",
            };
        });

        res.status(200).json({ rooms: chatList });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while retrieving chat rooms.",
        });
    }
};

const get_Client_Rooms = async (req, res) => {
    try {
        const clientId = req.params.clientId;

        // Fetch the rooms that the client is part of, including the latest message for each room
        const rooms = await MessagesRoom.findAll({
            where: {
                clientId: clientId,
            },
            include: [
                {
                    model: Teachers,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Students,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Messages,
                    // attributes: ["message"],
                    where: {
                        receiverId: clientId,
                        receiverType: "teacher",
                        senderType: "student",
                    },
                    order: [["createdAt", "DESC"]],
                    limit: 1,
                    required: false, // This allows rooms with no messages
                },
            ],
        });

        // Format the data to include the latest message
        const chatList = rooms.map((room) => {
            const latestMessage = room.Messages[0] || {}; // Get the latest message or an empty object if no messages
            return {
                ...room.toJSON(),
                lastMessage: latestMessage || "No messages yet",
            };
        });

        res.status(200).json({ rooms: chatList });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while retrieving chat rooms.",
        });
    }
};
const fetchMessages = async (roomId) => {
    return await Messages.findAll({
        where: {
            roomId,
        },
        order: [["createdAt", "ASC"]],
        include: [
            {
                model: Students,
                as: "Studentsender",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Teachers,
                as: "Teachersender",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Students,
                as: "freelancerReceiver",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Teachers,
                as: "clientReceiver",
                attributes: ["id", "firstName", "lastName"],
            },
        ],
    });
};

const get_Freelancer_ChatRoom = async (req, res) => {
    try {
        const { freelancerId, roomId } = req.params;

        // Fetch the messages in the room
        const messages = await fetchMessages(roomId);

        await MessagesRoom.update(
            { freelancerUnreadMessages: 0 },
            { where: { id: roomId, freelancerId } }
        );
        const room = await MessagesRoom.findOne({
            where: {
                id: roomId,
            },
            include: [
                {
                    model: Teachers,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Students,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
            ],
        });
        res.status(200).json({ messages, room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const get_Client_ChatRoom = async (req, res) => {
    try {
        const { clientId, roomId } = req.params;

        // Fetch the messages in the room
        const messages = await fetchMessages(roomId);

        await MessagesRoom.update(
            { clientUnreadMessages: 0 },
            { where: { id: roomId, clientId } }
        );
        const room = await MessagesRoom.findOne({
            where: {
                id: roomId,
            },
            include: [
                {
                    model: Teachers,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
                {
                    model: Students,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "profile_pic_link",
                    ],
                },
            ],
        });
        res.status(200).json({ messages, room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const post_Freelancer_Message = async (req, res) => {
    try {
        const { freelancerId, roomId } = req.params;
        let { message } = req.body;
        const { clientId } = req.body;
        // Validate message
        if (!message || !clientId || !roomId || !freelancerId) {
            return res.status(400).json({ error: "messing data" });
        } else if (isNaN(freelancerId) || isNaN(clientId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        message = message.trim();
        if (message.length === 0) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }
        message = message.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        message = message.replace(/\n+/g, " "); // Replace multiple newline characters with a single space
        message = message.replace(/\s+/g, " ").trim(); // Replace multiple spaces with a single space and trim again

        const freelancer = await Students.findByPk(freelancerId);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }

        // Check if the client exists
        const client = await Teachers.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Create new message
        const newMessage = await Messages.create({
            message,
            senderId: freelancerId,
            receiverId: clientId,
            senderType: "student",
            receiverType: "teacher",
            roomId,
        });

        // Update unread messages count
        await MessagesRoom.update(
            {
                clientUnreadMessages: Sequelize.literal(
                    "clientUnreadMessages + 1"
                ),
            },
            { where: { id: roomId } }
        );

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const post_Client_Message = async (req, res) => {
    try {
        const { clientId, roomId } = req.params;
        const { freelancerId } = req.body;
        let message = req.body.message;
        // Validate message
        if (!message || !freelancerId || !clientId || !roomId) {
            return res.status(400).json({ error: "messing data" });
        } else if (isNaN(freelancerId) || isNaN(clientId) || isNaN(roomId)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        message = message.trim();
        if (message.length === 0) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }
        message = message.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        message = message.replace(/\n+/g, " "); // Replace multiple newline characters with a single space
        message = message.replace(/\s+/g, " ").trim(); // Replace multiple spaces with a single space and trim again

        const client = await Teachers.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Check if the freelancer exists
        const freelancer = await Students.findByPk(freelancerId);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }

        // Create new message
        const newMessage = await Messages.create({
            message,
            senderId: clientId,
            receiverId: freelancerId,
            senderType: "teacher",
            receiverType: "student",
            roomId,
        });

        // Update unread messages count
        await MessagesRoom.update(
            {
                freelancerUnreadMessages: Sequelize.literal(
                    "freelancerUnreadMessages + 1"
                ),
            },
            { where: { id: roomId } }
        );

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    get_Freelancer_Rooms,
    get_Client_Rooms,
    get_Freelancer_ChatRoom,
    get_Client_ChatRoom,
    post_Freelancer_Message,
    post_Client_Message,
};
