const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deafen')
        .setDescription('Deafen a member in voice channel')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to deafen')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (member.voice.channel) {
            member.voice.setDeaf(true);
            await interaction.reply(`${target.tag} has been deafened.`);
        } else {
            await interaction.reply('User is not in a voice channel.');
        }
    },
};
