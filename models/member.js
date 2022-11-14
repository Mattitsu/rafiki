const mongoose = require("mongoose");

const CreateMember = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    username: String,
    ign: String,
    work_multiple: Number,
    money: Number,
    bank: Number,
    rank: String,
    reputation: Number,
    facebook: String,
    instagram: String,
    twitter: String,
    team_manager: Array,
    ll_stats:Array,
});

module.exports = mongoose.model("Member", CreateMember);