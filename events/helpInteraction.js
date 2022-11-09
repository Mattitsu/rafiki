const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const mongoose = require('mongoose')
const client = require('..');
const Team = require('./../models/team')

// HELP DROPDOWN MENU

client.on('interactionCreate', async interaction => {
    
    if (!interaction.isButton()) return;
    

    // await interaction.deferReply({ephemeral: false});
    
    
    // PLAYER HELP BUTTON
    if(interaction.customId == 'player-help'){

        const embed = new EmbedBuilder().setTitle( `Rafiki Bot Player Commands` )
        .setDescription("Rafiki Bot is used to keep track of Players Stats in regards to Livik League\nUse the commands below to view your info & more!")
            .addFields(
                {name:`\u200b` , value: "__Info Commands__" },
                {name: "View Your Info", value: "Use \`/my profile\` to view your profile"},
                {name: "View Team Info", value: "Use \`/my team\` to view your team info"},
                {name:`\u200b` , value: "__Team Commands__" },
                { name: "Leave team", value: `Use \`/team leave\` to leave your current team`} 
            )
            .setFooter({text: `Click below to remove this message`})

            return interaction.reply({embeds: [embed], ephemeral: true})
                
               

    };

    // TEAM HELP BUTTON
    if(interaction.customId == 'team-help'){
        const embed = new EmbedBuilder().setTitle( `Rafiki Bot Team Commands` )
        .setDescription("Rafiki Bot is used to keep track of Team Stats in regards to Livik League\nUse the commands below to view more info!")
            .addFields(
                {name:`\u200b` , value: "__Info Commands__" },
                {name: "View Team Info", value: "Use \`/team info [TAG]\` to view team info"},
                {name: "View Team List", value: "Use \`/team list\` to view a list of teams registered with Rafiki"},
                {name:`\u200b` , value: "__Team Commands__" },
                { name: "Create a team", value: `Use \`/team create\` to create your team`}, 
                { name: "Check your teams status", value: `Use \`/team status\` to see if the team meets Livik League requirements`},
                 
                { name: "Manage your team (Coming Soon)", value: "Use \`/team manage [TAG]`\ to view Team Management Menu"},
                {name: "Delete your team", value: "Use \`/team delete [TAG]\` to delete your team"},
                
                
            )
            .addFields(
                {name: `\u200b`, value: "__Player Management Commands__(Manager use only)" },
                {name: "Add a player", value: "Use \`/team player-add [Player @ ]\` to view add player to your team"},
                {name: "Kick a player", value: "Use \`/team player-remove [Player @ ]\` to view kick a player from your team"},
            )
            .setFooter({text: `Click below to remove this message`})

            return interaction.reply({embeds: [embed], ephemeral: true})
    };
    // LIVIK LEAGUE HELP BUTTON
    if(interaction.customId == 'll-help'){
        interaction.editReply(`Livik League Help Here`)
    }
    // FAQ HELP BUTTON
    if(interaction.customId == 'faq-help'){
        interaction.editReply(`FAQ Help Here`)
    }
    // SUPPORT BUTTON
    if(interaction.customId == 'support'){
        interaction.editReply(`Support`)
    }


})