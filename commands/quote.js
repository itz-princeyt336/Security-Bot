const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get a random inspirational quote.'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data.content;
            const author = response.data.author;

            await interaction.reply(`_"${quote}"_ - **${author}**`);
        } catch (error) {
            await interaction.reply('Could not fetch a quote at this moment. Please try again later.');
        }
    },
};
