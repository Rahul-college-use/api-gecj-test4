const mongoose = require('mongoose');


const url1 = "mongodb+srv://GECJ:gec123@gecj.o4nhqas.mongodb.net/?appName=GECj"
// const url2 = "mongodb://localhost:27017"
const connectdb = async () => {
  try {
    await mongoose.connect(`${url1}`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectdb;
