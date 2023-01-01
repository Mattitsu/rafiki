const Member = require("../models/member");

module.exports = {
	id: 'new_user',
	permissions: [],
	run: async (client, interaction) => {

        const user = interaction.member.user

        const newUser = await Member.findOne({
            user_id: user.id
        })

        console.log(newUser)

        if(newUser) 
        {
            return interaction.reply({content: `You already have an account. use \`/my profile\` in the <#1042426045212655677> channel to view your profile!`, ephemeral: true})
        } else {
      
        const newMember = new Member({
            guild_id: interaction.guild.id,
            user_id: user.id,
            username: user.username
        })

        await newMember.save()
        
        

		interaction.reply({content: `Your profile has been created, use \`/my profile\` in the <#1042426045212655677> channel to view your profile!\n\nHead over to <#1042434707704524911> for more customization`, ephemeral: true})
    }
	}
}