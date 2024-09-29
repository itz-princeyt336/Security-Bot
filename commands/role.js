const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Assign or remove a role from a member')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The member to modify roles for')
            .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role to assign/remove')
            .setRequired(true))
        .addBooleanOption(option =>
            option.setName('add')
            .setDescription('Add (true) or remove (false) the role')
            .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const add = interaction.options.getBoolean('add');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            if (add) {
                await member.roles.add(role);
                await interaction.reply(`Added role ${role.name} to ${target.tag}.`);
            } else {
                await member.roles.remove(role);
                await interaction.reply(`Removed role ${role.name} from ${target.tag}.`);
            }
        } else {
            await interaction.reply('User not found.');
        }
    },
};
