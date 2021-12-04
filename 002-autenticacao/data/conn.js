const mongoose = require("mongoose");

async function main() {
  mongoose.connect("mongodb://localhost:27017/mybase");
  console.log("Conectado ao mongodb");
}

main().catch((err) => {
  console.log(err);
});
module.exports = mongoose;
