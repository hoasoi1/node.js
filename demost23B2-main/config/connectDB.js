

module.exports = connectMongo;
const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectMongo;
