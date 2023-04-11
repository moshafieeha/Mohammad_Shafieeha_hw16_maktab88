const mongoose = require("mongoose")


  
  // model = collection -> contains "Name" and "Schema" as its validator
  module.exports = mongoose.model("Product", ProductSchema);
  