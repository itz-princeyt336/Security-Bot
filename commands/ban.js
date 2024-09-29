const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The member to ban')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            await member.ban();
            await interaction.reply(`${target.tag} has been banned.`);
        } else {
            await interaction.reply('User not found.');
        }
    },
};
