const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Change the nickname of a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to change nickname for')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('nickname')
            .setDescription('The new nickname')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const nickname = interaction.options.getString('nickname');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            await member.setNickname(nickname);
            await interaction.reply(`${target.tag}'s nickname has been changed to ${nickname}.`);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
