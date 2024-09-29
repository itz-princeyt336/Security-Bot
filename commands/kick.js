const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to kick')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            await member.kick();
            await interaction.reply(`${target.tag} has been kicked.`);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
