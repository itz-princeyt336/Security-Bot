const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

// Path to the JSON file
const warningsFilePath = path.join(__dirname, '../warnings.json');

// Function to load warnings from the JSON file
function loadWarnings() {
    if (fs.existsSync(warningsFilePath)) {
        return JSON.parse(fs.readFileSync(warningsFilePath, 'utf-8'));
    } else {
        return {};
    }
}

// Function to save warnings to the JSON file
function saveWarnings(warnings) {
    fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearwarnings')
        .setDescription('Clear all warnings for a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to clear warnings for')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');

        // Load the current warnings
        let warnings = loadWarnings();

        // Clear warnings for the user
        if (warnings[target.id]) {
            delete warnings[target.id];
            saveWarnings(warnings);
            await interaction.reply(`${target.tag}'s warnings have been cleared.`);
        } else {
            await interaction.reply(`${target.tag} has no warnings to clear.`);
        }
    },
};
