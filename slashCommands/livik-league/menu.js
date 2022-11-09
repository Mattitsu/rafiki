const { SelectMenuBuilder, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');

const Team = require('./../../models/team');

module.exports = {
    name: 'll',
    description: "Livik League Menu",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'team-list',
            description: 'Sends list of registered teams (Livik League Season Two)',
            type: ApplicationCommandOptionType.Subcommand,

        },
        
        
    ],

    run: async (client, interaction) => {

        if(interaction.options.getSubcommand() === 'team-list' ){

            const registeredTeams = await Team.find({regStatus: "registered"});

            let data = `__Livik League S2 - Registered Teams__\n\n`

            let index = 1

            registeredTeams.forEach(team => {
                index ++
                data += `**${index}** | ${team.teamName}\n`
            });

            return interaction.reply({content: data})




        }


        

    }


};