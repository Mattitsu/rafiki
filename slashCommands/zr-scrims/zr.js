const { SelectMenuBuilder, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');
const fs = require('fs');
const { json } = require('stream/consumers');

const team = require('./../../models/team');

const SSID = "1iY1IeuvDVRdVb8y67624XBPDhGUN8fOnAnrj2IWELNM"




module.exports = {
	name: 'zr',
	description: "Zero Remorse Scrims",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'set-up',
            description: 'Set up scrims',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {name: "teamlist-channel",
                description: "Tag the team list",
                type: ApplicationCommandOptionType.Channel,
                required: true,}
            ]
        },
        {
            name: 'register',
            description: 'Register for ZR Scrims',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "team-name",
                    description: "Your Team Name",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "team-tag",
                    description: "Your Team Tag [XXX]",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "alt-manager",
                    description: "Alternative Manager",
                    type: ApplicationCommandOptionType.User,
                    
                }
            ]
            
        },
        // {
        //     name:'update-sheet',
        //     description: 'Adds teams to Google Sheet',
        //     type: 1,
        // }
        
    ],
	
	run: async (client, interaction) => { 


        // OPEN REGISTRATION


        if(interaction.options.getSubcommand() === 'set-up') {

           // Scrim Name
            // Reg Channel ID (Channel)
           // Slot Message ID (Message)
           // Codes Channel ID (Channel)
           // Number Of Slots (Number)
           // Admin Accept Channel (Channel)
           // Waitlist Channel (Channel)
           // Number of slots (Number)
           // First Slot (Number)


 
            }


        // REGISTER COMMAND

        if(interaction.options.getSubcommand() === 'register') {

            // await interaction.deferReply({ephemeral: false})

            const teamName = interaction.options.get('team-name').value;
            const teamTag = interaction.options.get('team-tag').value;
            const teamManager = interaction.member.id;
            const altManager = interaction.options.get('alt-manager').value;

            // console.log(teamName , teamTag, teamManager, altManager)

            const rows = await client.sheets.values.get({
                auth: client.auth,
                spreadsheetId: '1iY1IeuvDVRdVb8y67624XBPDhGUN8fOnAnrj2IWELNM',
                range: "Sheet1!A2:A15"
            })

           const data = rows.data.values.find(row => row[0] === teamName)

           if(data) {
            interaction.reply("Team Name already exists")
            
           } else if (!data){

                await client.sheets.values.append({
                    auth: client.auth,
                    spreadsheetId: '1iY1IeuvDVRdVb8y67624XBPDhGUN8fOnAnrj2IWELNM',
                    range: "Sheet1!A2:A15",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [teamName, teamTag, teamManager, altManager || null, false]
                        ]
                    }
                });



                return interaction.reply("Team Registered - Please don't forget to confirm your slot and submit your roster")


           }

        }

    }}