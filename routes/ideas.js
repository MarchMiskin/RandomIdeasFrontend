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
  //   res.json({ success: true, data: req.params.id });
  // const idea = ideas.find((idea) => idea.id === +req.params.id);
  //   if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "Resource not found" });
  // }
  // res.json({ success: true, data: idea });
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// const ideas = [
//   {
//     id: 1,
//     text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
//     tag: "Technology",
//     username: "TonyStark",
//     date: "2022-01-02",
//   },
//   {
//     id: 2,
//     text: "Milk cartons that turn a different color the older that your milk is getting",
//     tag: "Inventions",
//     username: "SteveRogers",
//     date: "2022-01-02",
//   },
//   {
//     id: 3,
//     text: "ATM location app which lets you know where the closest ATM is and if it is in service",
//     tag: "Software",
//     username: "BruceBanner",
//     date: "2022-01-02",
//   },
// ];

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
  //   res.json({ success: true, data: req.params.id });
  // const idea = ideas.find((idea) => idea.id === +req.params.id);
  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "Resource not found" });
  // }

  // idea.text = req.body.text || idea.text;
  // idea.tag = req.body.tag || idea.tag;

  // res.json({ success: true, data: idea });
  try {
    console.log(req);
    // console.log(res);
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.query.text,
          tag: req.query.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  //   res.json({ success: true, data: req.params.id });
  // const index = ideas.findIndex((idea) => idea.id === +req.params.id);
  // if (!index) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "Resource not found" });
  // }
  // const idea = ideas[index];
  // ideas.splice(index, 1);

  // console.log(req.params);

  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }

  // res.json({ success: true, data: idea });
});
