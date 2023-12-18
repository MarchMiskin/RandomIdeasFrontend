const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 5000;

const connectDB = require("./config/db");

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://localhost:5000",
      "http://localhost:3000",
      "https://localhost:3000",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  //   res.send("Hello World");
  //   res.send({ message: "Hello World" });
  res.json({ message: "Welcome to the RandomIdeas API" });
});
// request, response

const ideasRouter = require("./routes/ideas");

app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log("Server listening on port " + port));
