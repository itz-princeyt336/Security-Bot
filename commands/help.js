const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help from this bot'),
    async execute(interaction) {
        // Mocked data for stats
        const commandCount = 33; // Replace with your actual command count
        const guildCount = interaction.guild.memberCount; // Actual number of users in the server
        const botAvatar = interaction.client.user.avatarURL(); // Bot avatar

        // Create the main help embed
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Help Menu')
            .setThumbnail(botAvatar)
            .setDescription(`• Get Help from this bot: \`/\`\n• Total Commands: ${commandCount} | Available to you (here): ${guildCount}`)
            .addFields(
                { name: '🧭 Categories', value: 'Select a category below to see available commands.', inline: false }
            )
            .setFooter({ text: 'Bot Support Link' })
            .setTimestamp();

        // Create buttons for categories
        const categoryButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('moderation')
                    .setLabel('Moderation')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('security')
                    .setLabel('Security')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('utility')
                    .setLabel('Utility')
                    .setStyle('Primary')
            );

        // Send the initial reply with the embed and buttons
        await interaction.reply({ embeds: [helpEmbed], components: [categoryButtons] });

        // Set up button interaction collector
        const filter = (btnInteraction) => {
            return btnInteraction.user.id === interaction.user.id;
        };

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 }); // Collector for 15 seconds

        collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.customId === 'moderation') {
                await btnInteraction.reply({
                    content: 'Here are the moderation commands:\n' +
                             '**/warn** - Warn a member.\n' +
                             '**/warnings** - View warnings for a member.\n' +
                             '**/clearwarnings** - Clear all warnings for a member.\n' +
                             '**/ban** - Ban a member.\n' +
                             '**/kick** - Kick a member.\n' +
                             '**/mute** - Mute a member.\n' +
                             '**/tempmute** - Temporarily mute a member.\n' +
                             '**/tempban** - Temporarily ban a member.\n' +
                             '**/deafen** - Deafen a member in voice chat.\n' +
                             '**/undeafen** - Undeafen a member in voice chat.\n' +
                             '**/role** - Assign or remove a role from a member.\n' +
                             '**/whois** - Fetch detailed information about a member.',
                    ephemeral: true
                });
            } else if (btnInteraction.customId === 'security') {
                await btnInteraction.reply({
                    content: 'Here are the security commands:\n' +
                             '**/antilink** - Enable or disable anti-link protection.\n' +
                             '**/antiinvite** - Enable or disable anti-invite protection.\n' +
                             '**/antispam** - Enable or disable anti-spam protection.',
                    ephemeral: true
                });
            } else if (btnInteraction.customId === 'utility') {
                await btnInteraction.reply({
                    content: 'Here are the utility commands:\n' +
                             '**/ping** - Check the bot\'s response time.\n' +
                             '**/userinfo** - Get information about a user.\n' +
                             '**/serverinfo** - Get information about the server.\n' +
                             '**/avatar** - Get the avatar of a user.\n' +
                             '**/8ball** - Ask a yes or no question and get an answer.\n' +
                             '**/remind** - Set a reminder for a specific time.\n' +
                             '**/poll** - Create a simple poll.\n' +
                             '**/time** - Get the current time in a specific timezone.\n' +
                             '**/quote** - Get a random inspirational quote.\n' +
                             '**/meme** - Get a random meme.',
                    ephemeral: true
                });
            }
        });

        collector.on('end', async () => {
            // Change the embed message after buttons can't be used
            const expiredEmbed = new EmbedBuilder()
                .setColor('#ff0000') // Set a different color to indicate expiry
                .setTitle('Bot Help Menu (Expired)')
                .setThumbnail(botAvatar)
                .setDescription(`• Get Help from this bot: \`/\`\n• Total Commands: ${commandCount} | Available to you (here): ${guildCount}`)
                .addFields(
                    { name: '🧭 Categories', value: 'The buttons have expired. Please use `/help` to get the latest commands again.', inline: false }
                )
                .setFooter({ text: 'Bot Support Link' })
                .setTimestamp();

            await interaction.editReply({ embeds: [expiredEmbed], components: [] }); // Update the reply with the new embed and hide buttons
        });
    },
};
