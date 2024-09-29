const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadSettings, saveSettings } = require('../settings'); // Adjust the path if necessary

module.exports = {
    data: new SlashCommandBuilder()
        .setName('antilink')
        .setDescription('Enable or disable anti-link protection')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Enable or disable anti-link protection')
                .setRequired(true)),
    async execute(interaction) {
        const enabled = interaction.options.getBoolean('enabled');
        let settings = loadSettings();

        settings.antilink = enabled;
        saveSettings(settings);

        await interaction.reply(`Anti-link protection has been ${enabled ? 'enabled' : 'disabled'}.`);
    },
};
