const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme.'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://meme-api.com/gimme');
            const meme = response.data.url;

            await interaction.reply({ content: meme });
        } catch (error) {
            await interaction.reply('Could not fetch a meme at this moment. Please try again later.');
        }
    },
};
