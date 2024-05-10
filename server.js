const express = require("express"); //Express.js, Node.js üzerinde çalışan bir web framework’üdür. Bu framework sayesinde, Node.js kullanarak web uygulamaları geliştirebiliriz.
const cors = require("cors"); //güvenlik için kullanıyoruz.
const dotenv = require("dotenv");
const db = require("./config/db");
const authRouter = require("./routes/auth.js"); //routes larımızı çağırdık
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", authRouter); //middleware api/register

const PORT = process.env || 8000;

//db(); ** mongo db bağlantımızı dışardan çağırdık

app.listen(PORT, () => {
  try {
    console.log("server is running port:8000");
  } catch (error) {
    console.log("server is  ERROR");
  }
});
