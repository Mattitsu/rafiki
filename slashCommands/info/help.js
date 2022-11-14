const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ApplicationCommandOptionType, ButtonStyle } = require('discord.js');

const Team = require('./../../models/team');
const Member = require('./../../models/member');


module.exports = {
    name: 'help',
    description: "Rafik Bot Help",
    cooldown: 3000,
    
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'intro',
            description: 'Send rafikibot intro message',
            type: ApplicationCommandOptionType.Subcommand,

        },
        

        {
            name: 'team',
            description: 'Team Commands & FAQ',
            type: ApplicationCommandOptionType.Subcommand,

        },

        {
            name: 'player',
            description: 'Player Commands & FAQ',
            type: ApplicationCommandOptionType.Subcommand,

        },
        
        
        
        

    ],

    

    run: async (client, interaction) => {

        // RAFIKI BOT INTRO

        if (interaction.options.getSubcommand() === 'intro'){
            // await interaction.deferReply({ephemeral: false});

            const helpButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('player-help')
					.setLabel('Player Help')
                    .setEmoji({name: '🔫'})
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('team-help')
					.setLabel('Team Help')
                    .setEmoji({name: '🏳'})
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('ll-help')
					.setLabel('Livik League Help')
                    .setEmoji({name: '⭐'})
                    .setDisabled(true)
					.setStyle(ButtonStyle.Primary),
                
			);

            const helpButtons2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('faq-help')
					.setLabel('FAQ\'s')
                    .setEmoji({name: '❓'})
                    .setDisabled(true)
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('support')
					.setLabel('Contact Support')
                    .setEmoji({name: '🆘'})
                    .setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )
		

            const embed = new EmbedBuilder()
            
            .setDescription(`Hi, i'm <@${client.user.id}>\n\nI was built by <@&887320195553706014> to help manage his Discord Server & PUBGM Livik League\n\n🔫 Player Stats\n🏳 Team Stats\n⭐ Livik League Stats\n\nIf you require any help please see more info below or use my \`/help\` commands.\n\n🔫 - Player Commands - \`/help player\`\n🏳 - Team Commands - \`/help team\`\n\n\`Do not DM moderators in relation to this Server and/or Livik League, this could end up with you being banned from the event & server\``)
            
            .setThumbnail(client.user.displayAvatarURL())
            return interaction.channel.send({embeds: [embed]})
        }


        // TEAM HELP COMMAND

        if (interaction.options.getSubcommand() === 'team'){
            // await interaction.deferReply({ ephemeral: false });
            const embed = new EmbedBuilder().setTitle( `Rafiki Bot Team Commands` )
            .setDescription("Rafiki Bot is used to keep track of Team Stats in regards to Livik League\nUse the commands below to view more info!")
            .addFields(
                {name:`\u200b` , value: "__Info Commands__" },
                {name: "View Team Info", value: "Use \`/team info [TAG]\` to view team info"},
                {name: "View Team List", value: "Use \`/team list\` to view a list of teams registered with Rafiki"},
                {name:`\u200b` , value: "__Team Commands__" },
                { name: "Create a team", value: `Use \`/team create\` to create your team`}, 
                 
                { name: "Manage your team (Coming Soon)", value: "Use \`/team manage [TAG]`\ to view Team Management Menu"},
                {name: "Delete your team", value: "Use \`/team delete [TAG]\` to delete your team \*Teams are deleted after 30 days"},
                
                
            )
            .addFields(
                {name: `\u200b`, value: "__Player Management Commands__(Manager use only)" },
                {name: "Add a player", value: "Use \`/team player-add [Player @ ]\` to view add player to your team"},
                {name: "Kick a player", value: "Use \`/team player-remove [Player @ ]\` to view kick a player from your team"},
            )

            return interaction.channel.send({embeds: [embed]})
        }

        // PLAYER HELP MENU COMMAND

        if (interaction.options.getSubcommand() === 'player'){

            // await interaction.deferReply({ ephemeral: false });
            const embed = new EmbedBuilder().setTitle( `Rafiki Bot Player Commands` )
            .setDescription("Rafiki Bot is used to keep track of Players Stats in regards to Livik League\nUse the commands below to view your info & more!")

            .addFields(
                {name:`\u200b` , value: "__Info Commands__" },
                {name: "View Your Info", value: "Use \`/my profile\` to view your profile"},
                {name: "View Team Info", value: "Use \`/my team\` to view your team info"},
                {name:`\u200b` , value: "__Team Commands__" },
                { name: "Join team", value: `Only Team Manager's can add players to teams!`},
                { name: "Leave team", value: `Use \`/team leave\` to leave your current team!`} 
            )

            return interaction.channel.send({embeds: [embed]})

        }

    }

};