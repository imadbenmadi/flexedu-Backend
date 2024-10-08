// const  Teachers  = require("../../Models/Teacher");
// const { Teacher_Summaries } = require("../../Models/Summary");
const { Teacher_Notifications } = require("../../Models/Notifications");
const Summaries = require("../../Models/Summary");
const Students = require("../../Models/Student");
const Summary_Purcase_Requests = require("../../Models/Summary_Purcase_Requests");

const GetSummaries = async (req, res) => {
  const userId = req.decoded.userId;
  if (!userId)
    return res.status(401).json({ error: "Unauthorized , missing userId" });
  try {
    const summarys = await Summaries.findAll({
      where: {
        TeacherId: userId,
      },
      order: [["createdAt", "DESC"]],
    });
    if (!summarys) return res.status(404).json({ error: "No summarys found." });
    return res.status(200).json({ Summaries: summarys });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
const GetSummary = async (req, res) => {
  const userId = req.decoded.userId;
  const summaryId = req.params.summaryId;
  if (!userId || !summaryId) {
    return res
      .status(409)
      .json({ error: "Unauthorized, missing userId or summaryId" });
  }
  try {
    const summary = await Summaries.findOne({
      where: {
        id: summaryId,
        TeacherId: userId,
      },
    });
    if (!summary) {
      return res.status(404).json({ error: "Summary not found." });
    }
    return res.status(200).json({ Summary: summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const DeleteSummary = async (req, res) => {
  const userId = req.decoded.userId;
  const summaryId = req.params.summaryId;
  if (!userId || !summaryId) {
    return res
      .status(409)
      .json({ error: "Unauthorized, missing userId or summaryId" });
  }
  try {
    const summary = await Summaries.findOne({
      where: {
        id: summaryId,
        TeacherId: userId,
      },
    });
    if (!summary) {
      return res.status(404).json({ error: "Summary not found." });
    }
    const summaryPurcaseRequests = await Summary_Purcase_Requests.findAll({
      where: {
        SummaryId: summaryId,
      },
    });
    if (summaryPurcaseRequests.length > 0) {
      return res.status(409).json({
        error: "Summary has purcase requests, cannot delete.",
      });
    }
    if (summary.Image) {
      const previousFilename = summary.Image.split("/").pop();
      const previousImagePath = `public/Summaries_Pictures/${previousFilename}`;
      try {
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
        }
      } catch (error) {
        console.error("Error deleting previous image:", error);
      }
    }
    if (summary.file_link) {
      const previousResumeFilename = summary.file_link.split("/").pop();
      const previousResumePath = path.join(
        "public/Summaries",
        previousResumeFilename
      );
      if (fs.existsSync(previousResumePath)) {
        try {
          fs.unlinkSync(previousResumePath);
        } catch (error) {
          return res.status(400).send({
            message: "Could not delete resume file: " + error.message,
          });
        }
      }
    }
    await summary.destroy();
    // Additional logic to delete related data like videos, student ownership, etc.
    return res.status(200).json({ message: "Summary deleted." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const EditSummary = async (req, res) => {
  const userId = req.decoded.userId;
  const summaryId = req.params.summaryId;
  const { Title, Description, Price, Category } = req.body;

  if (!userId || !summaryId || !Title || !Description || !Category) {
    return res.status(409).json({
      error:
        "Unauthorized, missing userId or summaryId or Title or Description or Price or Category",
    });
  }

  try {
    const summary = await Summaries.findOne({
      where: {
        id: summaryId,
        TeacherId: userId,
      },
    });
    if (!summary) {
      return res.status(404).json({ error: "Summary not found." });
    }

    summary.Title = Title;
    summary.Description = Description;
    summary.Price = Price;
    summary.Category = Category;
    await summary.save();

    return res.status(200).json({ message: "Summary updated." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
const add_Summary = async (req, res) => {
  if (req.decoded.userType !== "teacher") {
    return res
      .status(401)
      .json({ error: "Forbidden: only teachers can create summarys." });
  }
  const userId = req.decoded.userId;
  const { Title, Description, Price, Category } = req.body;

  // Check if all required fields are present
  if (!userId || !Title || !Description || !Category) {
    return res.status(409).json({
      error:
        "Unauthorized: missing userId, Title, Description, Price, duration, or Category",
    });
  }

  try {
    // Create a new summary
    const summary = await Summaries.create({
      Title: Title, // Match case with your model
      Description: Description, // Match case with your model
      Price: Price, // Match case with your model
      Category: Category, // Category is mandatory per your model
      TeacherId: userId, // Set the teacher (user) ID
    });

    // Send success response
    return res
      .status(200)
      .json({ message: "Course created successfully.", summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
module.exports = {
  GetSummaries,
  DeleteSummary,
  GetSummary,
  EditSummary,
  add_Summary,
};
