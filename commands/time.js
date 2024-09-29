const { SlashCommandBuilder } = require('@discordjs/builders');
const { DateTime } = require('luxon');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Get the current time in a specific timezone.')
        .addStringOption(option =>
            option.setName('timezone')
                .setDescription('Enter a timezone (e.g., "America/New_York")')
                .setRequired(true)),
    async execute(interaction) {
        const timezone = interaction.options.getString('timezone');
        try {
            const currentTime = DateTime.now().setZone(timezone).toString();
            await interaction.reply(`The current time in **${timezone}** is: ${currentTime}`);
        } catch (error) {
            await interaction.reply('Invalid timezone. Please check the format and try again.');
        }
    },
};
