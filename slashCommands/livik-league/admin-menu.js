const { SelectMenuBuilder, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');
const team = require('./../../models/team');

const SSID = "1iY1IeuvDVRdVb8y67624XBPDhGUN8fOnAnrj2IWELNM"


module.exports = {
	name: 'll-admin',
	description: "Livik League Admin Menu",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'reg-button',
            description: 'Sends Livik League Reg Button',
            type: 1,
            
        },
        {
            name:'update-sheet',
            description: 'Adds teams to Google Sheet',
            type: 1,
        }
        
    ],
	
	run: async (client, interaction) => {

        if(interaction.options.getSubcommand() === 'update-sheet') {

            // Get teams from mongoDB

            const teamlist = await team.find({})

            console.log(teamlist)

            teamlist.forEach(team => {
                console.log(team.teamTag)
            });

            const rows = await client.sheets.values.get({
                auth: client.auth,
                spreadsheetId: '1iY1IeuvDVRdVb8y67624XBPDhGUN8fOnAnrj2IWELNM',
                range: "Sheet1!A:B"
            })
            console.log(rows.data.values)

        };
        

        if(interaction.options.getSubcommand() === 'reg-button') {

            const embed = new EmbedBuilder()
                .setTitle('Register for Livik League')
                .setDescription(`Click the button below to start registration.`)
                .setColor('Green')
                
            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Register')
                .setStyle('Success')
                .setCustomId('reg_button')
                // .setDisabled(true)
            );

            interaction.reply({embeds: [embed], components: [buttons]})
        }
    }
};