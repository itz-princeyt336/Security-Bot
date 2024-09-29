const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadSettings, saveSettings } = require('../settings'); // Adjust the path if necessary

module.exports = {
    data: new SlashCommandBuilder()
        .setName('antispam')
        .setDescription('Enable or disable anti-spam protection')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Enable or disable anti-spam protection')
                .setRequired(true)),
    async execute(interaction) {
        const enabled = interaction.options.getBoolean('enabled');
        let settings = loadSettings();

        settings.antispam = enabled;
        saveSettings(settings);

        await interaction.reply(`Anti-spam protection has been ${enabled ? 'enabled' : 'disabled'}.`);
    },
};
