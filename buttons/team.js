const { verifyRole } = require('../config.json');
const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const Team = require('../models/team');
const Member = require('../models/member');

module.exports = {
	id: 'my-team',
	permissions: [],
	run: async (client, interaction) => {

		await interaction.deferReply()

		let desc = ``

		const teamsManage = await Team.find({teamManager: interaction.user.id})

		teamsManage.forEach(team => {
			desc += `${team.teamName}\n`
		});

		const teamsPlayer = await Team.findOne({team_members: interaction.user.id})

		console.log(desc)

		const embed = new EmbedBuilder()
		.setTitle(`${interaction.user.username}'s Profile`)
		.addFields({ name: "Team Manager:", value: `${desc ? desc : `Not a manager`}`})
		.addFields({ name: "Player for", value: `${teamsPlayer ? teamsPlayer.teamName : `No Team`}`})
		
		.setThumbnail(`${interaction.member.displayAvatarURL()}`)
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


	return interaction.editReply({embeds: [embed], components: [Profilebuttons]})

		
		
		
        
	}
};


