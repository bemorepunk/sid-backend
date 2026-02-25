import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/v1/chat/completions", async (req, res) => {

  const messages = req.body.messages || [];

  const userMessage =
    messages.find(m => m.role === "user")?.content
    || "";

  res.json({
    id: "chatcmpl-sid",
    object: "chat.completion",
    created: Date.now(),
    model: "sid",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "SID is now connected via MCP. You said: " + userMessage
        },
        finish_reason: "stop"
      }
    ]
  });

});

app.listen(PORT, "0.0.0.0", () => {
  console.log("SID MCP connected on port " + PORT);
});
