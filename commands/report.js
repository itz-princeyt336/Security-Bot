const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a member for misconduct')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to report')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason for the report')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const reportsChannel = interaction.guild.channels.cache.find(channel => channel.name === 'reports');

        if (!reportsChannel) {
            return interaction.reply({ content: 'Reports channel not found!', ephemeral: true });
        }

        const reportMessage = `**Reported User:** ${target.tag}\n**Reported By:** ${interaction.user.tag}\n**Reason:** ${reason}`;
        await reportsChannel.send(reportMessage);
        await interaction.reply({ content: `Successfully reported ${target.tag}.`, ephemeral: true });
    },
};
