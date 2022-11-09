module.exports = {
	id: 'my-stats',
	permissions: [],
	run: async (client, interaction) => {

		return interaction.reply({content: `This should show the players stats`, ephemeral: false})
	}
}