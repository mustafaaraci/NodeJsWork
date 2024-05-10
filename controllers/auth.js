const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs"); // şifreyi güvenlikli hale getirebiliriz.
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, mail } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (user) {
      res.status(500).json({ message: "böyle bir kullanıcı var" });
    }
    if (password.length < 8) {
      res.status(500).json({ message: "şifre 8 karakterden az olamaz" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({
      username,
      password: hashedPassword,
      mail,
    }); //veri tabanına kayıt edecek sonucunda response dönmemiz gerekecek
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(201).json({ status: "OK", ...newUser, token });
  } catch (error) {
    res.status(500).json({ message: "burada bir hata var" });
  }
};

const login = async () => {
  const { password, mail } = req.body;
  try {
    const user = await Auth.findOne({ mail });
    if (!user) {
      return res
        .status(500)
        .json({ message: "böyle bir kullanıcı bulunamadı" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(500).json({ message: "girilen şifre hatalı" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({ status: "OK", ...user, token });
  } catch (error) {
    res.status(500).json({ message: "burada bir hata var" });
  }
};

module.exports = { register, login };
