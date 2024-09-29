const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadSettings, saveSettings } = require('../settings'); // Use '../' to go up one directory

module.exports = {
    data: new SlashCommandBuilder()
        .setName('antiinvite')
        .setDescription('Enable or disable anti-invite protection')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Enable or disable anti-invite protection')
                .setRequired(true)),
    async execute(interaction) {
        const enabled = interaction.options.getBoolean('enabled');
        let settings = loadSettings();

        settings.antiinvite = enabled;
        saveSettings(settings);

        await interaction.reply(`Anti-invite protection has been ${enabled ? 'enabled' : 'disabled'}.`);
    },
};
