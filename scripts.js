import OpenAI from "openai";
import { config } from "dotenv"
config()
// Set your OpenAI API key here
const apiKey = process.env.API_KEY;

const openai = new OpenAI({ apiKey });

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "hello ChatGpt" }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  } catch (error) {
    console.error(error);
  }
}

main();
