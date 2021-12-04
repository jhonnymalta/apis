const express = require("express");

const app = express();

//database
const conn = require("./data/conn");

//json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
const userRoute = require("./routes/userRoutes");

app.use("/api/v1/user", userRoute);

app.use = app.listen("5500", () => {
  console.log("App rodando na porta 5500");
});
