
const {ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle} = require('discord.js')

module.exports = {
	id: 'reg_button',
	permissions: [],
	run: async (client, interaction) => {

        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('Livik League | Team Registration');

		// Add components to modal

        // Information Input
        // const regInfoInput = new TextInputBuilder()
		// 	.setCustomId('regInfoInput')
		//     // The label is the prompt the user sees for this input
		// 	.setLabel("Reg Requirements - Info Only")
        //     .setPlaceholder('Put Requirements here')
        //     .setRequired(false)
            
        //     .setValue(`IGL must play all games\nPUBGM Account Lvl 35 & Above`)
		//     // Short means only a single line of text
		// 	.setStyle(TextInputStyle.Paragraph);
       

		// Create the text input components
		const teamNameInput = new TextInputBuilder()
			.setCustomId('teamNameInput')
		    // The label is the prompt the user sees for this input
			.setLabel("Team Name")
            .setMaxLength(12)
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const teamTagInput = new TextInputBuilder()
			.setCustomId('teamTagInput')
            .setPlaceholder('XXX')
            .setMaxLength(3)
			.setLabel("Team's tag (XXX) ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);

        

		// An action row only holds one text input,
		// so you need one action row per text input.
        // const infoActionRow = new ActionRowBuilder().addComponents(regInfoInput);
        
        
        
		const firstActionRow = new ActionRowBuilder().addComponents(teamNameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(teamTagInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
		// await interaction.member.roles.add(verifyRole);
        // if (interaction.member.roles.cache.get(verifyRole)) return interaction.reply({ content: `${interaction.user}, You were already verified.`, ephemeral: true })
        // return interaction.reply({ content: `✅ ${interaction.user}, Why you clicking my button` })
	}
};
