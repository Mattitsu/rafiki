const mongoose = require("mongoose");

const CreateMember = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    username: String,
    ign: String,
    work_multiple: Number,
    money: {type: Number,default: 500},
    bank: Number,
    rank: String,
    reputation: Number,
    facebook: String,
    instagram: String,
    twitter: String,
    team_tag: Array,
    info: String,
});

module.exports = mongoose.model("Member", CreateMember);