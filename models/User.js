const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//  encrypting password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
