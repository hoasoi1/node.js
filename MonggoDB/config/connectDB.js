const mongoose = require("mongoose");
async function connectMongo() {
  await mongoose.connect("mongodb://127.0.0.1:27017/demo");
  console.log("connected!");
}

module.exports = connectMongo;