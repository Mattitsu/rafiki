const Member = require("../models/member");

module.exports = {
	id: 'new_user',
	permissions: [],
	run: async (client, interaction) => {

        const user = interaction.member.user

        console.log(user)

        const newMember = new Member({
            guild_id: interaction.guild.id,
            user_id: user.id,
            username: user.username
        })

        await newMember.save()
        
        

		return interaction.reply({content: `You have been added to my database, use \`/my profile\` to view your profile!`, ephemeral: false})
	}
}