const OpenAI = require("openai");
const { config } = require("dotenv");

config();

// Set kunci API OpenAI Anda di sini
const apiKey = process.env.API_KEY;

// Buat instance OpenAI dengan kunci API
const openai = new OpenAI({ apiKey });

module.exports = {
  send: async (req, res) => {
    const body = req.body;

    // Pengecekan apakah pertanyaan terkait kesehatan makanan
    if (isHealthFoodQuestion(body.message)) {
      try {
        // Buat panggilan API OpenAI menggunakan instance 'openai'
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: body.message }],
          model: "gpt-3.5-turbo",
        });

        // Catat respons dari OpenAI ke konsol
        console.log(completion.choices[0].message.content);

        // Kirim respons ke klien HTTP
        res.status(200).json({
          message: body.message,
          aiResponse: completion.choices[0].message.content,
        });
      } catch (error) {
        // Tangani kesalahan API OpenAI
        console.error("Kesalahan API OpenAI:", error);
        res.status(500).json({ error: "Kesalahan Server Internal" });
      }
    } else {
      // Jika pertanyaan tidak terkait kesehatan makanan, kirim respons lain (atau tidak kirim respons)
      res.status(200).json({
        message: "Pertanyaan tidak terkait kesehatan atau makanan.",
      });
    }
  },
};

// Fungsi untuk menentukan apakah pertanyaan terkait kesehatan makanan
// Fungsi untuk menentukan apakah pertanyaan terkait kesehatan makanan
function isHealthFoodQuestion(message) {
    const healthFoodKeywords = ["makanan sehat", "makanan","nutrisi", "diet", "resepi sehat","resep makanan","kesehatan"];
    
    // Lakukan pencarian kata kunci dalam pesan pengguna
    for (const keyword of healthFoodKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        return true; // Jika ada kata kunci yang cocok, pertanyaan dianggap terkait kesehatan makanan
      }
    }
  
    return false; // Jika tidak ada kata kunci yang cocok, pertanyaan dianggap tidak terkait
  }
  
