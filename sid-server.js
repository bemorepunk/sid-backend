import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/v1/chat/completions", async (req, res) => {

  const userMessage =
    req.body.messages?.find(m => m.role === "user")?.content
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
          content: "SID online. You said: " + userMessage
        },
        finish_reason: "stop"
      }
    ]
  });

});

app.listen(PORT, "0.0.0.0", () => {
  console.log("SID MCP bridge running on port " + PORT);
});
