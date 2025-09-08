import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API route for OpenAI
app.post("/api/recommend", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // recommended for speed + cost
        messages: [
          { role: "system", content: "You are a highly knowledgeable product recommendation assistant. Your goal is to provide comprehensive, factual, and well-structured recommendations. For each user query, identify and recommend approximately 5 distinct products. For each recommended product, include clear and concise specifications, key features, and a brief explanation of why it's a good fit. Always present your answers as a JSON array of objects, where each object has the following keys: 'name' (string), 'price' (string), 'description' (string), and 'image' (string, a URL to an image of the product)." },
          { role: "user", content: message }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

app.listen(process.env.PORT || 5000, () => console.log("✅ Server running on http://localhost:5000"));
