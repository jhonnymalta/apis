//model
const { isValidObjectId } = require("mongoose");
const { count } = require("../models/Candidato");
const CandidatoModel = require("../models/Candidato");

module.exports = class candidatosController {
  static async newCandidato(req, res) {
    const { nome, numero, partido } = req.body;
    console.log();

    //validations
    if (!nome) {
      res.status(422).json({ message: "Nome do candidato obrigatório" });
      return;
    }
    if (!numero) {
      res.status(422).json({ message: "Número do candidato obrigatório" });
      return;
    }

    //verifica se candidato ja existe
    const candidatoExiste = await CandidatoModel.findOne({ numero: numero });

    if (candidatoExiste) {
      res
        .status(422)
        .json({ message: "Número para candidato não disponível!" });
      return;
    }

    const newCandidato = new CandidatoModel({
      nome: nome,
      numero: numero,
      partido: partido,
    });

    newCandidato
      .save()
      .then(res.status(201).json({ message: "Candidato criado com sucesso!" }))
      .catch(() => {
        res.status(401).json({ message: "Falha ao registrar candidato" });
      });
  }

  static async getAllCandidatos(req, res) {
    try {
      const todos = await CandidatoModel.find();
      res.status(200).json({ todos });
    } catch (error) {
      res.status(422).json({ message: "Não foi possível buscar Candidatos" });
    }
  }

  static async getCandidatoById(req, res) {
    const id = req.params.id;

    const candidato = await CandidatoModel.findOne({ _id: id });

    if (!candidato) {
      res.status(422).json({ message: "Candidato não encontrado!" });
      return;
    }
    res.status(200).json({ candidato });
  }

  static async editCandidatoById(req, res) {
    const id = req.params.id;

    const { nome, numero, partido } = req.body;

    //validacoes
    if (!nome) {
      res.status(422).json({ message: "Nome do usuário é obrigatorio" });
      return;
    }

    // verifica se ja não existe algum candidato com numero envidado
    const numeroExite = await CandidatoModel.findOne({ numero: numero });
    console.log(numeroExite);
    console.log(nome);
    console.log(numero);
    if (numeroExite) {
      res.status(422).json({ message: "Número de candidato já utilizado" });
      return;
    }

    const existeCandidato = await CandidatoModel.findOne({ _id: id });

    if (!existeCandidato) {
      res.status(422).json({ message: "Id de candidato não localizado." });
      return;
    }

    try {
      await CandidatoModel.findOneAndUpdate(
        { _id: id },
        { $set: { nome: nome, numero: numero, partido: partido } },
        { new: true }
      );
      res.status(200).json({ message: "Candidato Atualizado com sucesso" });
    } catch (error) {
      res.status(422).json({ message: "Erro ao atualizar candidato" });
    }
  }

  static async deleteCandidatoByID(req, res) {
    const id = req.params.id;

    const existeId = await CandidatoModel.findById(id);

    if (!existeId) {
      res.status(422).json({ message: "Id de candidato inválido" });
      return;
    }
    try {
      await CandidatoModel.findByIdAndDelete(id);
      res.status(201).json({ message: "Candidato deletado com sucesso" });
    } catch (error) {
      res.status(401).json({ message: "Não foi possível deletar" });
    }
  }
};
