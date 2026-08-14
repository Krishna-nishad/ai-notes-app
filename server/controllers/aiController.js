const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note content is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",

      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that summarizes notes clearly and concisely.",
        },
        {
          role: "user",
          content: `Summarize this note. Keep all important points and use simple language:

${content}`,
        },
      ],

      temperature: 0.3,
      top_p: 0.7,
      max_tokens: 1000,

      stream: false,
    });

    const summary = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error("NVIDIA AI ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to summarize note",
    });
  }
};

// ===============================
// AI GENERATE NOTE
// ===============================

const generateNote = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",

      messages: [
        {
          role: "system",
          content: `
You are an expert note-taking AI.

Create clear, useful and well-structured study notes.

Return the response in exactly this format:

TITLE:
<short title>

CONTENT:
<detailed notes>

Do not add unnecessary explanations outside this format.
          `,
        },

        {
          role: "user",
          content: `Create study notes about:

${topic}`,
        },
      ],

      temperature: 0.5,
      top_p: 0.7,
      max_tokens: 1500,

      stream: false,
    });

    const result = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.error("GENERATE NOTE ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to generate note",
    });
  }
};

module.exports = {
  summarizeNote,
  generateNote,
};