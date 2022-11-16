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
        {
            name: 'team',
            description: 'View your team',
            type: ApplicationCommandOptionType.Subcommand,
        },
        
        
    ],
    run: async (client, interaction) => {

        const Taggedmember = interaction.options.getUser('user') || interaction.user;

        const team = await Team.findOne({team_members: Taggedmember.id}) 

        // PROFILE COMMAND
        
        if(interaction.options.getSubcommand() === 'profile'){
       
      
        

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

        
        
        
       const clan = ``

       const message = `__**${Taggedmember.username}'s Profile**__\n\nServer Level: \`💠\` \nMoney: \`💰 Coins\`\nBank: \`💰 Coins\` \n\n__PUBG Mobile Stats__\nTeam: ${team ? team.teamName : `No Team`}\nClan: ${clan ? clan.clanName : `No Clan`}\n\nFTM Profile | Rafiki Discord Bot `

        // Show user profile embed here

        const embed = new EmbedBuilder()
            .setTitle(`${Taggedmember.username}'s Profile`)
            
            .addFields({ name: "Rank:", value: `\`💠\``})
            .addFields({ name: "Money:", value: `\`💰 Coins\``})
            .addFields({ name: "Team:", value: `${team ? team.teamName : `No Team`}`, inline: true })
            .addFields({ name: "Clan:", value: `${clan ? clan.clanName : `No Clan`}`, inline: true })
            .setThumbnail(`${Taggedmember.avatarURL()}`)
            .setFooter({text: `Rafiki Discord Bot Profile | For more info use /bot-info command`})

         // Profile Buttons 
            // Team Info
            // Livik League Stats

            
        // const Profilebuttons = new ActionRowBuilder().addComponents(
        //         new ButtonBuilder()
        //                 .setLabel('My Team')
        //                 .setCustomId('my-team')
        //                 .setStyle('Primary'),

        //             new ButtonBuilder()
        //                 .setLabel('My Stats')
        //                 .setCustomId('my-stats')
        //                 .setStyle('Primary')      
        //     )


        return interaction.reply({embeds: [embed]})
    }
        
    }

    // TEAM COMMAND

    if(interaction.options.getSubcommand() === 'team'){

        await interaction.deferReply();

        if(!team){
            return interaction.editReply(`You are not a member of any team. Use \`/help team\` for more information`)
        }

        var roster = ``

        if (team.team_members) {
            team.team_members.forEach(m => {
                roster += `\n<@${m}>`
            })
        }
        else { roster += `No Players...\nUse the \`team invite\` command to add players to your team` }




        let teamMembers = team.team_members ? team.team_members.length : `0`


        const embed = new EmbedBuilder()
                .setTitle(`${team.teamName}`)
                .setDescription(`**Team Manager:** <@${team ? team.teamManager : `No Team`}>\n**Team Role:** (Coming Soon)`)
                .addFields({ name: `Number of Players`, value: `${teamMembers}/6` }, { name: `Players`, value: roster || `\u200b` })
                .addFields({ name: `Team Status`, value: `Pending` })
                .setFooter({ text: `Rafiki Bot Team Profile || Team Tag: ${team.teamTag}` })
                .setThumbnail(team.teamIcon)

            return interaction.editReply({ embeds: [embed] })


    }
    

    // DATA COMMAND


    

    }}