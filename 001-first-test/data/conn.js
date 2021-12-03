const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/eleicoes");
  console.log("Conectado ao Mongodb");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
