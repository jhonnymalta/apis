//model
const userModel = require("../models/User");

const bcrypt = require("bcryptjs");

const createUserToken = require("../helpers/create-user-token");

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

    const newUser = new userModel({
      name: name,
      email: email,
      password: passwordHash,
    });
    try {
      await newUser.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async deleteUser(req, res) {
    const usuario = req.params.id;

    try {
      await userModel.findOneAndDelete({ _id: usuario });
      res.status(200).json({
        message: "Usuárido deletado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "Email obrigatório." });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "password obrigatório." });
      return;
    }

    //check if email exist
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(422).json({ message: "Email não cadastrado!" });
      return;
    }

    // check if password match wit db
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha Inválida" });
      return;
    }

    await createUserToken(user, req, res);
  }
};
