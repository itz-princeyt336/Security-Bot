const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set slow mode for a channel')
        .addIntegerOption(option =>
            option.setName('seconds')
            .setDescription('The number of seconds for slow mode (0 to disable)')
            .setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        await interaction.channel.setRateLimitPerUser(seconds);
        await interaction.reply(`Slow mode has been set to ${seconds} seconds.`);
    },
};
