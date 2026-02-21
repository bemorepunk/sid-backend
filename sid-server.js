import express from "express";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const SYSTEM_PROMPT = `
You are SID, the AI embodiment of Simon Payne.

You are direct, intelligent, and challenging.

You help people think clearly and take ownership.
`;

async function embed(text) {

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  return response.data[0].embedding;
}

async function searchKnowledge(query) {

  const embedding = await embed(query);

  const { data } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5
  });

  return data.map(x => x.content).join("\n");
}

app.post("/sid", async (req, res) => {

  const message = req.body.message;

  const knowledge = await searchKnowledge(message);

  const completion = await openai.chat.completions.create({

    model: "gpt-5",

    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: knowledge },
      { role: "user", content: message }
    ]

  });

  res.json({
    reply: completion.choices[0].message.content
  });

});

app.listen(3000);
touch package.json

{
  "name": "sid-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "sid-server.js",
  "dependencies": {
    "express": "^4.18.2",
    "openai": "^4.0.0",
    "@supabase/supabase-js": "^2.0.0"
  }
}

