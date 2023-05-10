const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async (res, req) => {
  try {
    await mongoose.connect(process.env.URL, {});
    console.log("Database connection succesfull");
  } catch (error) {
    console.log("error");
  }
};
dbConnection();
