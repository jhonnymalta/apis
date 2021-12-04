//model
const userModel = require("../models/User");

const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = class userController {
  static async newUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "O campo nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O campo email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "O campo Password é obrigatório" });
      return;
    }
    if (!confirmPassword) {
      res.status(422).json({ message: "Confirme o password" });
      return;
    }

    //verify if passwords macth
    if (password !== confirmPassword) {
      res.status(422).json({ message: "Password não confere" });
      return;
    }

    // verify if email alredy exists
    const emailExiste = await userModel.findOne({ email: email });
    if (emailExiste) {
      res.status(401).json({ message: "Email já cadastrado" });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 8);

    const newUser = new User({
      name: name,
      email: email,
      password: passwordHash,
    });
    try {
      newUser.save({ newUser });
      res.status(201).json({ message: "Usuário criado" });
      console.log(newUser);
    } catch (error) {
      res.status(422).json({ message: "Erro ao cadastrar usuário" });
    }
  }
};
