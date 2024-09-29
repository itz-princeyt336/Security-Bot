const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Fetch detailed information about a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to fetch information for')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        const roles = member.roles.cache.map(role => role.name).join(', ');
        const embed = {
            color: 0x0099ff,
            title: `User Info: ${target.tag}`,
            fields: [
                { name: 'ID', value: target.id },
                { name: 'Roles', value: roles },
                { name: 'Joined Server', value: member.joinedAt.toDateString() },
                { name: 'Joined Discord', value: target.createdAt.toDateString() }
            ],
        };

        await interaction.reply({ embeds: [embed] });
    },
};
