const { SlashCommandBuilder } = require('@discordjs/builders');

const responses = [
    'Yes',
    'No',
    'Maybe',
    'Definitely',
    'Absolutely not',
    'Ask again later',
    'It is certain',
    'My sources say no',
    'Yes, in due time',
    'I wouldn\'t count on it',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask a yes or no question and get an answer.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = responses[Math.floor(Math.random() * responses.length)];

        await interaction.reply(`🎱 Question: ${question}\n**Answer:** ${answer}`);
    },
};
