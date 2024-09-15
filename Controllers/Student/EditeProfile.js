const { Students, Skills, PortfolioItems } = require("../../Models/Student");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the Student by their ID
        const Student = await Students.findByPk(userId);

        if (!Student) {
            return res.status(404).json({ error: "Student not found." });
        }

        await Student.update(newData);

        if (newData.Skills) {
            await updateSkills(Student.id, newData.Skills);
        }

        if (newData.PortfolioItems) {
            await updatePortfolioItems(Student.id, newData.PortfolioItems);
        }

        // Fetch updated skills and portfolio items
        const updatedSkills = await Skills.findAll({
            where: { StudentId: Student.id },
        });
        const updatedPortfolioItems = await PortfolioItems.findAll({
            where: { StudentId: Student.id },
        });

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: Student,
            Skills: updatedSkills,
            PortfolioItems: updatedPortfolioItems,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const updateSkills = async (StudentId, skills) => {
    // Ensure skills is an array of objects with the skill name and StudentId
    const skillEntries = skills.map((skill) => ({
        skill,
        StudentId: StudentId,
    }));

    // Destroy existing skills
    await Skills.destroy({ where: { StudentId: StudentId } });

    // Create new skills
    if (skills.length > 0) {
        await Skills.bulkCreate(skillEntries);
    }
};

const updatePortfolioItems = async (StudentId, portfolioItems) => {
    // Add StudentId to each portfolio item
    const portfolioEntries = portfolioItems.map((item) => ({
        ...item,
        StudentId: StudentId,
    }));

    // Destroy existing portfolio items
    await PortfolioItems.destroy({ where: { StudentId: StudentId } });

    // Create new portfolio items
    if (portfolioItems.length > 0) {
        await PortfolioItems.bulkCreate(portfolioEntries);
    }
};

module.exports = { EditeProfile };
