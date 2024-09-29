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
        .setName('warn')
        .setDescription('Warn a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to warn')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason for the warning')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        // Load the current warnings
        let warnings = loadWarnings();

        // Check if the user already has warnings
        if (!warnings[target.id]) {
            warnings[target.id] = [];
        }

        // Add the new warning
        warnings[target.id].push({
            reason: reason,
            date: new Date().toISOString(),
            warnedBy: interaction.user.tag,
        });

        // Save the updated warnings back to the JSON file
        saveWarnings(warnings);

        await interaction.reply(`${target.tag} has been warned for: ${reason}`);
    },
};
