import axios from "axios";

const HF_TOKEN = "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";
export const chatWithAI = async () => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt-j-6B",
      {
        header: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
};

chatWithAI();
