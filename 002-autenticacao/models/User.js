const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O campo nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "O campo e-mail é obrigatório"],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "O campo password precisa ser preenchiso"],
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
