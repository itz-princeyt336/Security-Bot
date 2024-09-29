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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('View warnings for a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to view warnings for')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');

        // Load the current warnings
        let warnings = loadWarnings();

        // Get warnings for the user
        const userWarnings = warnings[target.id] || [];

        if (userWarnings.length === 0) {
            await interaction.reply(`${target.tag} has no warnings.`);
        } else {
            const warningList = userWarnings.map((warning, index) => 
                `**${index + 1}.** Reason: ${warning.reason} | Date: ${new Date(warning.date).toLocaleString()} | Warned by: ${warning.warnedBy}`
            ).join('\n');

            await interaction.reply(`**Warnings for ${target.tag}:**\n${warningList}`);
        }
    },
};
