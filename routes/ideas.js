const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

module.exports = router;

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Add an idea
router.post("/", async (req, res) => {
  //   res.send("POST success");
  // We can do the following because of the body parser middleware
  //   res.send(req.body.text);
  const idea = new Idea({
    // id: ideas.length + 1,
    // id: ideas[ideas.length - 1].id + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // date: new Date().toISOString().slice(0, 10),
  });

  // ideas.push(idea);

  // res.json({ success: true, data: idea });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update idea
router.put("/:id", async (req, res) => {
  // console.log(req.params);
  // console.log(req.query);

  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      // console.log(req.params);
      // console.log(req.query);
      // console.log(req.body);
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }
    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "You are not authorized to update this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "You are not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});
