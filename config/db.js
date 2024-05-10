const { error } = require("console");
const mongoose = require("mongoose"); //mongo db üzerinde model oluşturabileceğiz ve mongo db ile bağlanmamızı yarayan kütüphanemiz

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    })
    .then(() => {
      console.log("mongo db bağlantısı başarılı");
    })
    .catch((err) => {
      // throw new error("bağlantı başarısız")
      console.log(err);
    });
};

module.exports = db;
