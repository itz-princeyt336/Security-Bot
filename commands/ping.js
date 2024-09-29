const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s response time.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! 🏓 Latency is ${ping}ms.`);
    },
};
