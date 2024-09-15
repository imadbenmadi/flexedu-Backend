const Teachers = require("../../../Models/Teacher");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the Teacher by their ID
        const Teacher = await Teachers.findByPk(userId);

        if (!Teacher) {
            return res.status(404).json({ error: "Teacher not found." });
        }

        await Teacher.update(newData);
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { EditeProfile };
