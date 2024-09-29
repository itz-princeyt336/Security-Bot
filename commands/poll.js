const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a simple poll.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The poll question')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Comma-separated list of options')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(',');

        const pollMessage = await interaction.reply({ content: `**Poll:** ${question}\n\n${options.map((opt, index) => `${String.fromCharCode(65 + index)}. ${opt.trim()}`).join('\n')}`, fetchReply: true });

        // Add reactions for each option
        for (let i = 0; i < options.length; i++) {
            await pollMessage.react(String.fromCharCode(65 + i)); // A, B, C, etc.
        }
    },
};
