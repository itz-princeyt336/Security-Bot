const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Set a reminder for a specific time.')
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time for the reminder (e.g., "10s", "5m", "1h")')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Reminder message')
                .setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('time');
        const message = interaction.options.getString('message');
        
        const timeInMs = parseTime(time);
        if (!timeInMs) {
            return interaction.reply('Invalid time format. Use "10s", "5m", or "1h".');
        }

        await interaction.reply(`Reminder set for ${time}. I will remind you about: "${message}"`);

        setTimeout(() => {
            interaction.followUp(`⏰ Reminder: ${message}`);
        }, timeInMs);
    },
};

// Helper function to parse time
function parseTime(input) {
    const regex = /^(\d+)(s|m|h)$/;
    const match = input.match(regex);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60000;
        case 'h':
            return value * 3600000;
    }
}
