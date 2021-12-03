const mongoose = require("mongoose");

const candidatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, " O nome é obrigatório"],
    unique: true,
  },
  numero: {
    type: Number,
    required: [true, "Número do candidato é obrigatório"],
  },
  partido: {
    type: String,
    default: "Sem Partido",
  },
});

const Candidato = mongoose.model("Candidato", candidatoSchema);

module.exports = Candidato;
