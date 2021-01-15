const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
    userID: String,
    guildID: String, 
    pollID: String, 
    question: String,
    status: String
});

module.exports = mongoose.model("Poll", pollSchema);