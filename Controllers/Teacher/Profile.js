const Teachers = require("../../Models/Teacher");
const getProfile = async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user_in_db = await Teachers.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        return res.status(200).json({ User: user_in_db });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
const edit_profile = async (req, res) => {
    const userId = req.decoded.userId;
    const {
        firstName,
        lastName,
        telephone,
        instgram_Link,
        linkedIn_Link,
        facebook_Link,
    } = req.body;
    try {
        const user_in_db = await Teachers.findByPk(userId);
        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        await user_in_db.update({
            firstName,
            lastName,
            telephone,
            instgram_Link,
            linkedIn_Link,
            facebook_Link,
        });
        return res
            .status(200)
            .json({ message: "Profile Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
module.exports = { getProfile, edit_profile };
