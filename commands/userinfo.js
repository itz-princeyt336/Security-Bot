const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get information about a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to fetch information for')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        const userInfo = `
**User:** ${target.tag}
**ID:** ${target.id}
**Joined Discord:** ${target.createdAt}
**Joined Server:** ${member.joinedAt}
        `;

        await interaction.reply(userInfo);
    },
};
