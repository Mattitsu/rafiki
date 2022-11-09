const mongoose = require("mongoose");

const Team = new mongoose.Schema({    
    
    teamName: String,
    teamTag: {type: String, unique: true},
    teamManager: String,
    regStatus: String,
    teamIcon: String,
    team_members: Array,
    confirmed: { type: Boolean, default: false},
    teamRole: String,
    soft_delete: {type: Boolean, default: false}
    
});

module.exports = mongoose.model("Team", Team);