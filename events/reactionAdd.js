const { EmbedBuilder, Collection, PermissionsBitField, Events } = require('discord.js')
const ms = require('ms');

const client = require('..');
const config = require('../config.json');

const prefix = client.prefix;
const cooldown = new Collection();

client.on(Events.MessageReactionAdd, async (reaction, user) => {

    // console.log(reaction.message.channelId)

    if(reaction.message.channelId != '1042423646418894888') return;

    if(reaction.partial) {
        try{
            await reaction.fetch();
        } catch (error) {
            console.log("Something went wrong", error)
            return;
        }
    }

    // Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);

});