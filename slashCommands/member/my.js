const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
// const Clan = require("../../settings/models/clan.js");
const Member = require("../../models/member");
const Team = require('../../models/team');
// const Auction = require("../../settings/models/auction.js");
// const Ticket = require("../../settings/models/ticket.js");
// const config = require("../../settings/default.js");

module.exports = { 
    name: "my",
    description: "View your profile or another user's profile.",
    options: [
        {
            name: 'profile',
            description: 'View your profile',
            type: ApplicationCommandOptionType.Subcommand,
        },
        
        
    ],
    run: async (client, interaction) => {

        // PROFILE COMMAND

        if(interaction.options.getSubcommand() === 'profile'){
       
      
        const Taggedmember = interaction.options.getUser('user') || interaction.user;

         // Check if member is in database
         // Request permissions to add to Database

        const dbMember = await Member.findOne(Taggedmember)

        if(!dbMember){

            // Create Profile Button

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                    .setLabel('Create Account')
                    .setCustomId('new_user')
                    .setStyle('Success')
                    
        )

            
            return interaction.reply({ephermiral: true, components: [row], content: `You are not yet in my Database, use the button below to create your account!`})
               
        } else {

        
        const team = await Team.findOne({team_members: Taggedmember.id}) 

        // Show user profile embed here

        const embed = new EmbedBuilder()
            .setTitle(`${Taggedmember.username}'s Profile`)
            .addFields({ name: "Server Roles:", value: `\u200b`})
            .addFields({ name: "Rank:", value: `\`💠\``, inline: true})
            .addFields({ name: "Money:", value: `\`💰 Coins\``, inline: true})
            .addFields({ name: "Team:", value: `${team ? team.teamName : `No Team`}`, inline: true})
            .setThumbnail(`${Taggedmember.avatarURL()}`)
            .setFooter({text: `Rafiki Discord Bot Profile | For more info use /bot-info command`})

         // Profile Buttons 
            // Team Info
            // Livik League Stats

            
        const Profilebuttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                        .setLabel('My Team')
                        .setCustomId('my-team')
                        .setStyle('Primary'),

                    new ButtonBuilder()
                        .setLabel('My Stats')
                        .setCustomId('my-stats')
                        .setStyle('Primary')      
            )


        return interaction.reply({embeds: [embed], components: [Profilebuttons]})
            }
        
    }

    // TEAM COMMAND

    

    // DATA COMMAND


    

    }}