const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempmute')
        .setDescription('Temporarily mute a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to mute')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
            .setDescription('Duration in minutes')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const member = interaction.guild.members.cache.get(target.id);
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

        if (!muteRole) {
            return interaction.reply('Mute role not found.');
        }

        if (member) {
            await member.roles.add(muteRole);
            await interaction.reply(`${target.tag} has been muted for ${duration} minutes.`);
            setTimeout(() => {
                member.roles.remove(muteRole);
                interaction.followUp(`${target.tag} has been unmuted.`);
            }, duration * 60000);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
