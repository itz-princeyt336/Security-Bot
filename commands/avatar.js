const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get the avatar of')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;

        await interaction.reply(`${user.tag}'s Avatar: ${user.displayAvatarURL({ dynamic: true, size: 1024 })}`);
    },
};
