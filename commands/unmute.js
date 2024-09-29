const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to unmute')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

        if (member) {
            await member.roles.remove(muteRole);
            await interaction.reply(`${target.tag} has been unmuted.`);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
