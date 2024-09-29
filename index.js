const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();

// Initialize the Discord client with required intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

// Load and register commands from the commands folder
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// Register slash commands (Loader)
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Load settings from settings.json for antifeatures
const settingsFilePath = path.join(__dirname, 'settings.json');
function loadSettings() {
    if (fs.existsSync(settingsFilePath)) {
        return JSON.parse(fs.readFileSync(settingsFilePath, 'utf-8'));
    } else {
        return { antilink: false, antiinvite: false, antispam: false, antinuke: false };
    }
}

function saveSettings(settings) {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
}

// Event: Ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Event: Interaction
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Anti-Link and Anti-Invite logic
client.on('messageCreate', async message => {
    if (message.author.bot) return;  // Ignore bot messages
    const settings = loadSettings();

    // Antilink: Delete messages containing links
    if (settings.antilink && message.content.includes('http')) {
        await message.delete();
        message.channel.send(`${message.author}, links are not allowed.`);
    }

    // Antiinvite: Delete messages containing Discord invites
    if (settings.antiinvite && message.content.includes('discord.gg')) {
        await message.delete();
        message.channel.send(`${message.author}, Discord invite links are not allowed.`);
    }

    // Antispam: Prevent spam (5 consecutive identical messages)
    if (settings.antispam) {
        if (!client.messageCache) client.messageCache = new Map();
        const userMessages = client.messageCache.get(message.author.id) || [];
        userMessages.push(message.content);

        if (userMessages.length > 5) userMessages.shift();  // Keep only last 5 messages

        client.messageCache.set(message.author.id, userMessages);

        // Check if user is spamming the same message
        const isSpamming = userMessages.every(msg => msg === userMessages[0]);

        if (isSpamming) {
            await message.delete();
            message.channel.send(`${message.author}, please stop spamming.`);
        }
    }
});

// Anti-Nuke Protection: Monitor for mass role and channel deletions
client.on('roleDelete', async (role) => {
    const settings = loadSettings();
    if (settings.antinuke) {
        console.log(`Role ${role.name} deleted, checking for mass deletions...`);
        // Add logic to handle potential nuke actions, such as preventing further deletions or taking action
    }
});

client.on('channelDelete', async (channel) => {
    const settings = loadSettings();
    if (settings.antinuke) {
        console.log(`Channel ${channel.name} deleted, checking for mass deletions...`);
        // Similar to roleDelete, logic to handle mass deletion detection
    }
});

// Login to Discord
client.login(process.env.TOKEN);