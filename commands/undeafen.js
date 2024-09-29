const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('undeafen')
        .setDescription('Undeafen a member in voice channel')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to undeafen')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (member.voice.channel) {
            member.voice.setDeaf(false);
            await interaction.reply(`${target.tag} has been undeafened.`);
        } else {
            await interaction.reply('User is not in a voice channel.');
        }
    },
};
