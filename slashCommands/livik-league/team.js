const { SelectMenuBuilder, EmbedBuilder, MessageCollector, ApplicationCommandType, ApplicationCommandOptionType, Embed } = require('discord.js');

const Team = require('./../../models/team');
const Member = require('./../../models/member');



const pendings = {};

const helperID = '1030761205964492800'

module.exports = {
    name: 'team',
    description: "Livik League Menu",
    cooldown: 3000,

    
    options: [

        {
            name: 'register',
            description: 'Register a team for Livik League',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "The tag of the team you want to get information about.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]

        },

        {
            name: 'delete',
            description: 'Delete a team',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "The tag of the team you want to get information about.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]

        },



        {
            name: 'list',
            description: 'List All Teams',
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: 'info',
            description: 'View your teams profile',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "The tag of the team you want to get information about.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ],

        },
        {
            name: 'create',
            description: "Create a team",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "team-name",
                    description: "Name of your team",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "team-tag",
                    description: "Name of your team",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },

            ]
        },
        {
            name: 'player-add',
            description: "Add a player to your team",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "The user you want to add.",
                    type: ApplicationCommandOptionType.User, /// 6 = User
                    required: true,
                },
                {
                    name: "tag",
                    description: "The team tag you want to add the player to.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        },

        {
            name: 'player-remove',
            description: "Remove a player from your team",
            type: ApplicationCommandOptionType.Subcommand,
            options: [

                {
                    name: "user",
                    description: "The user you want to remove.",
                    type: ApplicationCommandOptionType.User, /// 6 = User
                    required: true,
                },
                {
                    name: "tag",
                    description: "The team tag you want to remove the player from.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        },

    ],



    run: async (client, interaction) => {

        if(interaction.options.getSubcommand() === 'register'){
            

            const teamTag = interaction.options.getString("tag");

            const taggedTeam = await Team.findOne({teamTag});

            if(!taggedTeam) return interaction.reply(`Cannot find a team with that TAG`);

            if(interaction.user.id != taggedTeam.teamManager) return interaction.editReply(`Only Team Managers can register a team!`)

            let teamMembers = taggedTeam.team_members ? taggedTeam.team_members.length : `0`

            console.log(taggedTeam)

            const teamEmbed = new EmbedBuilder().setTitle(`${taggedTeam.teamName} - Livik League Reg Status`)

            // if(teamMembers < 4) {   
            //     teamEmbed.addFields({name: `Number Of Players (min 4)`, value: `You currently only have ${teamMembers} out of 6 players`})
            //     return interaction.editReply({embeds:[teamEmbed]})
            // }
            console.log(taggedTeam.regStatus)
            if(taggedTeam.regStatus === "registered") {
                return interaction.reply(`⚠ You are already registered for Livik League! \n\nView your team info using \`/team info [TAG]\` command.\nView team list using \`/team list\` command.`);
            }

            const updateTeam = await taggedTeam.updateOne({regStatus: "registered"})

           

            return interaction.reply(`✅ ${taggedTeam.teamName} has been successfully registered into Season Two Livik League\nView registered teams use \`/ll teams-list\``);
            

        }

        if (interaction.options.getSubcommand() === 'player-remove') {

            await interaction.deferReply({ ephemeral: false });

            const usertoKick = interaction.options.getUser("user");

            const teamTag = interaction.options.getString("tag")

            const usertoKickid = usertoKick.id;

            const commandRanBy = interaction.member.user.id;

            const getTeam = await Team.findOne({ teamTag, team_members: usertoKickid })


            if (!getTeam) {
                return interaction.editReply("User is not in a team")
            }

            if (commandRanBy != getTeam.teamManager) {
                return interaction.editReply("Only team manager & bot managers can kick players from a team. You sir are neither!")
            } 
        



            const removedMember = await Team.findOneAndUpdate({ team_members: usertoKickid }, { "$pull": { team_members: usertoKickid } })

            interaction.editReply({ content: `<@${usertoKickid}> has been removed from ${removedMember.teamName} by ${interaction.user}` })

        }


        // LEAVE TEAM

        if (interaction.options.getSubcommand() === 'leave') {

            const member = interaction.member.id

            const dbmember = await Team.findOneAndUpdate({ team_members: member }, { "$pull": { team_members: member } })

            if (!dbmember) {
                return interaction.reply("You are not in a team why are you trying to leave")
            }


            interaction.reply({ content: `You have left ${dbmember.teamName ? dbmember.teamName : null}`, ephemeral: true })


        };

        // DELETE TEAM

        if (interaction.options.getSubcommand() === 'delete') {
            await interaction.deferReply({ ephemeral: false });

            if (!interaction.member.roles.cache.has("1030761205964492800")) return "You do not have the required roles to delete a team !"

            const teamTag = interaction.options.getString("tag");

            const aTeamT = await Team.findOneAndUpdate({ teamTag }, { soft_delete: true });

            interaction.editReply(`${aTeamT.teamName} has been deleted`)


        };

        // CREATE TEAM

        if (interaction.options.getSubcommand() === 'create') {

            await interaction.deferReply({ ephemeral: false });

            const teamName = interaction.options.getString("team-name");
            const teamTag = interaction.options.getString("team-tag");

            const teamIcon = "https://media.discordapp.net/attachments/925675983699312663/930652439445651487/download.png";

            // const user = await Member.findOne({ guild_id: interaction.guild.id, user_id: interaction.user.id });

            // const team = await Team.findOne({ guild_id: interaction.guild.id, teamManager: interaction.user.id });

            const aTeamN = await Team.findOne({ teamName });

            if (aTeamN) return interaction.editReply("Team Name already in use, Please choose another Team Name");

            const aTeamT = await Team.findOne({ teamTag });

            if (aTeamT) return interaction.editReply("Team Tag has been taken please use another Tag");

            if (teamName.length > 12) return interaction.editReply("Teams Name's have a max of 12 characters");

            if (teamTag.length > 3) return interaction.editReply("Your team tag must be 3 letters eg. XXX ");

            const newMember = await Member.findOneAndUpdate(
                { user_id: interaction.user.id },
                {
                    guild_id: interaction.guild.id,
                    username: interaction.user.username,
                    team_tag: []
                },
                { upsert: true, new: true }
            )

            newMember.team_tag.push(teamTag);

            await newMember.save()

            const newTeam = new Team({
                teamName,
                teamTag,
                teamManager: interaction.user.id,
                team_members: [],
                teamIcon

            });

            await newTeam.save().then(
                () => {
                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setTitle("Team Created")
                        .setDescription(` Team \`[${teamName}]\` has been created. Use \`/team info [TAG]\` to view team profile`)
                        .setThumbnail(teamIcon)
                        .setFooter({ text: `Team Tag ${teamTag}` })


                    return interaction.editReply({ embeds: [embed] })
                }
            )





        };



        // PLAYER ADD

        if (interaction.options.getSubcommand() === 'player-add') {

            await interaction.deferReply({ ephemeral: false });
            const taggedMember = interaction.options.getUser("user");
            const teamTag = interaction.options.getString("tag");

            // if(taggedMember.id === interaction.user.id) return interaction.editReply("You can't add yourself");
            if (taggedMember.bot) return interaction.editReply("You can't add bots to your team");



            // START OF MORE LOGIC TO EDIT

            /// Try to create new database went this member not have!
            const newuser = await Member.findOne({ guild_id: interaction.guild.id, user_id: taggedMember.id })

            // Add user to database

            if (!newuser) {
                const newDBUser = await new Member({
                    guild_id: interaction.guild.id,
                    user_id: taggedMember.id
                });

                await newDBUser.save();
            }

            // Get team information

            const team = await Team.findOne({ teamManager: interaction.user.id, teamTag });

            if (!team) return interaction.editReply("You are not the Team Manager")

            // Check if member already in team

            const inTeam = await Team.findOne({ team_members: taggedMember.id })


            if (inTeam) return interaction.editReply(`This member is already a player in ${inTeam.teamName}. You can only be a player in one team `);

            if (team.team_members.includes(taggedMember.id)) return interaction.editReply(`This member is already in ${team.teamName} team`);

            if (team.team_members.length >= '6') return interaction.editReply("Your team is full");

            const embeded = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`Team Add Player Confirmation`)
                .setDescription(`<@${interaction.user.id}> has added <@${taggedMember.id}> to ${team.teamName} !`)
                // .setThumbnail(clan.clan_icon)
                
            team.team_members.push(taggedMember.id)

            await team.save()

            return interaction.editReply({ embeds: [embeded], ephemeral: true });

        }

        

        if (interaction.options.getSubcommand() === 'info') {

            await interaction.deferReply({ ephemeral: false });

            const teamTag = interaction.options.getString("tag")

            const team = await Team.findOne({ teamTag })

            if (!team) return interaction.editReply(`Cannot find a team with that tag`)

            let roster = ``

            if (team.team_members) {
                team.team_members.forEach(m => {
                    roster += `\n<@${m}>`
                })
            }
            else { roster += `No Players...\nUse the \`team invite\` command to add players to your team` }




            let teamMembers = team.team_members ? team.team_members.length : `0`


            const embed = new EmbedBuilder()
                .setTitle(`${team.teamName}`)
                .setDescription(`**Team Manager:** <@${team.teamManager}>\n**Team Role:** (Coming Soon)`)
                .addFields({ name: `Number of Players`, value: `${teamMembers}/6` }, { name: `Players`, value: roster || `\u200b` })
                .addFields({ name: `Team Status`, value: `Pending` })
                .setFooter({ text: `Rafiki Bot Team Profile || Team Tag: ${team.teamTag}` })
                .setThumbnail(team.teamIcon)

            return interaction.editReply({ embeds: [embed] })

        }



        if (interaction.options._subcommand === 'list') {
            const dbTeams = await Team.find({ soft_delete: false })
            let nofTeams = dbTeams.length
            console.log(dbTeams)

            let title = `**:star: Rafik Bot Teams List :star:**\n\n`



            let description = ``



            let confirmed = ``

            if (dbTeams.confirmed === 'true') {
                confirmed = `:white_check_mark`
            } else {
                confirmed = `:star:`
            }

            let index = [0]

            if (dbTeams.length > 0) {
                dbTeams.forEach(team => {
                    index++
                    description += `**${index}**・\`${team.teamTag}\`・${team.teamName} (${team.team_members.length}/6 Players)\n`
                });
            } else if (dbTeams.length == 0) {
                description += `No teams found in my database`
            }

            description += `\n\n\n`


            const embed = new EmbedBuilder().setDescription(title += description).addFields({ name: ":star: More Info :star:", value: `To see more info about a team commands use \`/help team\`` })

            interaction.reply(description)

        }

    }


};