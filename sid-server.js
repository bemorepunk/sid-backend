{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import express from "express";\
import OpenAI from "openai";\
import \{ createClient \} from "@supabase/supabase-js";\
\
const app = express();\
app.use(express.json());\
\
const openai = new OpenAI(\{\
  apiKey: process.env.OPENAI_API_KEY\
\});\
\
const supabase = createClient(\
  process.env.SUPABASE_URL,\
  process.env.SUPABASE_KEY\
);\
\
const PORT = process.env.PORT || 3000;\
\
app.post("/sid", async (req, res) => \{\
\
  try \{\
\
    const message = req.body.message || "Hello";\
\
    const completion = await openai.chat.completions.create(\{\
      model: "gpt-5",\
      messages: [\
        \{\
          role: "system",\
          content: "You are SID, Simon Payne's AI clone."\
        \},\
        \{\
          role: "user",\
          content: message\
        \}\
      ]\
    \});\
\
    res.json(\{\
      reply: completion.choices[0].message.content\
    \});\
\
  \} catch (error) \{\
\
    console.error(error);\
\
    res.status(500).json(\{\
      reply: "SID encountered an error."\
    \});\
\
  \}\
\
\});\
\
app.listen(PORT, () => \{\
  console.log(`SID running on port $\{PORT\}`);\
\});\
}