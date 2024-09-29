const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get information about the server'),
    async execute(interaction) {
        const { guild } = interaction;

        const serverInfo = `
**Server Name:** ${guild.name}
**Total Members:** ${guild.memberCount}
**Created On:** ${guild.createdAt}
        `;

        await interaction.reply(serverInfo);
    },
};
