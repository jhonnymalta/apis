const express = require("express");
const app = express();

//conn mongodb
const conn = require("./data/conn");

// json config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas
const candidatosRoutes = require("./routes/candidatosRoutes");

app.use("/api/v1/candidatos", candidatosRoutes);

app.listen("5500", () => {
  console.log("Server Rodando.");
});
