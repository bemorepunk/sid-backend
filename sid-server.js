import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("SID backend is running.");
});

app.post("/sid", (req, res) => {
  res.json({
    reply: "SID is alive."
  });
});

app.listen(PORT, () => {
  console.log("SID running on port " + PORT);
});
