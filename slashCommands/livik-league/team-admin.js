const { SelectMenuBuilder, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');


const Team = require('./../../models/team');
const Member = require('./../../models/member');




const helperID = "1030761205964492800"



module.exports = {
    name: 'admin-team',
    description: "Livik League Menu",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'list',
            description: 'Sends Team List (Admin)',
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: 'player-info',
            description: 'Change a teams manager',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                
                {
                    name: "player-tag",
                    description: "The tag of the player you want to check",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ],

        },
        {
            name: 'swap-manager',
            description: 'Change a teams manager',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "The tag of the team you want to change the manager of",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "new-manager",
                    description: "The tag of the new manager you want to add",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ],

        },
            
        
    ],


    run: async (client, interaction) => {

        if(!interaction.member.roles.cache.has(helperID)) return interaction.reply(`You cannot use these commands - <@&${helperID}> Use Only`)

        if(interaction.options.getSubcommand() === 'player-info') {
            return interaction.reply("Player Info Here")
        }
        
        
        // SWAP MANAGER COMMAND

        if(interaction.options.getSubcommand() === 'swap-manager') {

            const teamTag = interaction.options.getString("tag")

            const newManagerId = interaction.options.getUser("new-manager")

           

            console.log(teamTag)
            console.log(newManagerId)

            const teamUpdated = await Team.findOneAndUpdate({teamTag},{teamManager: newManagerId},{new: true})

            console.log(teamUpdated)


           return interaction.reply({content: `Manager has been changed to <@${teamUpdated.teamManager}>`})
        };

        // LIST TEAMS (ADMIN VERSION)

        if (interaction.options.getSubcommand() === 'list') {
            const dbTeams = await Team.find({})
            let nofTeams = dbTeams.length
             
 
             let title = `**:star: Rafik Bot Teams List :star:**\n\n`
 
             
 
             let description = ``
 
             
 
             let confirmed = ``
 
             if(dbTeams.confirmed === 'true'){
                 confirmed = `:white_check_mark`
             } else {
                 confirmed = `:star:`
             }
 
             let index = [0]
 
             if(dbTeams.length > 0){
                 dbTeams.forEach(team => {
                     index ++
                     description += `**${index}**・\`${team.teamTag}\`・${team.teamName}\nTeam Manager: <@${team.teamManager}>\nNumber of Players: ${team.team_members.length}/6\nReg Status: ${team.regStatus || `\u200b`}\nSoft Delete: ${team.soft_delete}\n\n`
             });
             } else if (dbTeams.length == 0){
                     description += `No teams found in my database`
             }
             
             description += `\n\n\n`

             title += description
 
         
         
 
         interaction.reply(title)
           
         };

        }
    };