const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to mute')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

        if (member) {
            await member.roles.add(muteRole);
            await interaction.reply(`${target.tag} has been muted.`);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
