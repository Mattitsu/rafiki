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
       
      
        const Taggedmember = interaction.user;

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

        
        const AllMembers = await Member.find()

        const totalMembers = AllMembers.length
        

        const description = `**User Bio:**\n${dbMember.info ? dbMember.info : " "}`
        // Show user profile embed here

        const embed = new EmbedBuilder()
            .setTitle(`${dbMember.username}'s Profile`)
            .setDescription(description)
            
            .addFields({ name: "Rank:", value: `${dbMember.rank? dbMember.rank : "0"} of ${totalMembers}`, inline: true})
            .addFields({ name: "Money:", value: `\`${dbMember.money} 🪙\``, inline: true})
            
            
            .addFields({ name: "Clan:", value: `No Clan`, inline: true})
            .addFields({ name: "Member of...", value: `No Social Club Membership Found`, inline: true})
            .setThumbnail(`${Taggedmember.avatarURL()}`)
            .setFooter({text: `Mwenzi Discord Bot Profile | For more info & commands use /help`})




            return interaction.reply({ embeds: [embed] })
        }

    }

    // TEAM COMMAND

    

    // DATA COMMAND


    

    }}