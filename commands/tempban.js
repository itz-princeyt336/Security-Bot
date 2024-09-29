const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('Temporarily ban a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to ban')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
            .setDescription('Duration in days')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            await member.ban();
            await interaction.reply(`${target.tag} has been banned for ${duration} days.`);
            setTimeout(async () => {
                await interaction.guild.members.unban(target.id);
                interaction.followUp(`${target.tag} has been unbanned.`);
            }, duration * 86400000);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
