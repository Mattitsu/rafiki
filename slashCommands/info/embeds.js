const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ApplicationCommandOptionType, ButtonStyle, AttachmentBuilder, Embed } = require('discord.js');

module.exports = {
    name: 'embeds',
    description: "Send Role Reaction Embeds",
    cooldown: 3000,
    
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'gender',
            description: 'Send gender role reaction embed',
            type: ApplicationCommandOptionType.Subcommand,

        },
        

        {
            name: 'age',
            description: 'Send age role reaction embed',
            type: ApplicationCommandOptionType.Subcommand,

        },

        {
            name: 'location',
            description: 'Send location role reaction embed',
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: 'register-button',
            description: 'Send sign-up button',
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: 'll-info',
            description: 'Send Livik League info embed',
            type: ApplicationCommandOptionType.Subcommand,

        },
        
        
        
        

    ],

    

    run: async (client, interaction) => {

        if(interaction.options.getSubcommand() === 'll-info'){

            const content = `__**League Structure 2023**__
            
- Q1
Season 1.1 - Jan 7/14/21/28
Season 1.2 - Feb 4/11/18/25
Season 1.3 - March 4/11/18/25
Season 1.4 - April 1/8/15/22
** - Livik League Cup - Round One - April 29th - **
            
- Q2
Season 1.5 - May
Season 1.6 - June
Season 1.7 - July
Season 1.8 - August
** - Livik League Cup - Round Two - **
            
- Q3
Season 1.9 - September
Season 1.10 - October
Season 1.11 - November
Season 1.12 - December
** - Livik League Cup - Round Three - **
            
** - Livik League Super Cup
`

            const embed = new EmbedBuilder().setDescription(content).setColor('Green').setThumbnail(client.user.displayAvatarURL({dynamic: true}))

            return interaction.channel.send({embeds: [embed]})

        }

        if(interaction.options.getSubcommand() === 'register-button'){

            const message = `
__**For The Members**__

For the members is an invite only Discord Community where people from all walks of life can chill, socialize and have fun in a non-toxic environment.
            
At the core of the 𝔽𝕋𝕄 ℂ𝕠𝕞𝕞𝕦𝕟𝕚𝕥𝕪 is <@887298734109650974> a Discord bot who's sole purpose in life is to watch over this Community giving & taking XP/Coins as & when required.
            
Upon joining members will be made a profile & can earn XP / Coins by being active in the server & participating in any giveaways/events ran by 𝔽𝕋𝕄 & partners
            
Members can use coins to upgrade their profiles, create & upgrade teams & clans aswell as much more....
            
To join 𝔽𝕋𝕄 you must be invited by an existing member. 
            
After joining the server click here to create a profile and be given the <@&1046550635794923621>\n\n
`

            const embed = new EmbedBuilder().setDescription(message).setColor('Green').setThumbnail(client.user.displayAvatarURL({dynamic: true}))

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                        .setLabel('Create Account')
                        .setCustomId('new_user')
                        .setStyle('Success')
                        
            )

            return interaction.channel.send({embeds: [embed], components: [row]})
        }

        if (interaction.options.getSubcommand() === 'gender'){
            //await interaction.deferReply({ephemeral: false});

            
            const file = new AttachmentBuilder('./images/gender.png');

            const embed = new EmbedBuilder()
                
                .setImage('attachment://images/gender.png')
                .setDescription('\n\n♂️ Male\n\n♀️ Female')
                .setColor('Yellow')
            


          return interaction.channel.send({  embeds: [embed], files: [file] })

           
            

           
    }

    if (interaction.options.getSubcommand() === 'age'){
        //await interaction.deferReply({ephemeral: false});

        
        const file = new AttachmentBuilder('./images/age.png');

        const embed = new EmbedBuilder()
            
            .setImage('attachment://images/age.png')
            .setDescription(`\n\n• 1️⃣ - Under 18\n• 2️⃣ - 19 > 24\n• 3️⃣ - 25 > 34\n• 4️⃣ - 35 > 44\n• 5️⃣ - Over 45`)
            .setColor('Yellow')
        


       return interaction.channel.send({  embeds: [embed], files: [file] })

        
        

       
}

if (interaction.options.getSubcommand() === 'location'){
    //await interaction.deferReply({ephemeral: false});

    
    const file = new AttachmentBuilder('./images/location.png');

    const embed = new EmbedBuilder()
        
        .setImage('attachment://images/location.png')
        .setDescription(`\n\n
        Please select your country below...

__**:flag_gb: • United Kingdom**__

:england: - England
:scotland: - Scotland
:wales: - Wales
<:NI:1042536474698055741> - Northern Ireland

__**:flag_eu: • Europe**__

:flag_ie: - Ireland

__**:earth_asia: • Asia**__

:flag_lb: - Lebanon 

\`If your country is not on our list please contact a member of Moderators Team and we will add it as soon as possible.\` `)
        .setColor('Yellow')
    


return interaction.channel.send({  embeds: [embed], files: [file] })


    
    

   
}





}}