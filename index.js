const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit


// const keyFile = require("./credentials.json")

// GOOGLE SHEETS STUFF
const { google } = require('googleapis');
const keys = require('./keys.json');

const auth = new google.auth.JWT(
		keys.client_email, 
		null, 
		keys.private_key, 
		['https://www.googleapis.com/auth/spreadsheets']
);

auth.authorize(function(err, tokens){
	if(err){
		console.log(err);
		return;
	} else {
		console.log("Connected")
		
	}
});

const gsapi = google.sheets({version: "v4", auth: auth });



// SHEETS STUFF ENDS

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

client.auth = auth
client.sheets = gsapi.spreadsheets
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)
