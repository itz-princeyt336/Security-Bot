const fs = require('fs');
const path = require('path');

// Path to settings file
const settingsFilePath = path.join(__dirname, 'settings.json');

// Load settings from the file
function loadSettings() {
    if (fs.existsSync(settingsFilePath)) {
        return JSON.parse(fs.readFileSync(settingsFilePath, 'utf-8'));
    } else {
        // Create a default settings file if it doesn't exist
        const defaultSettings = { antilink: false, antiinvite: false, antispam: false, antinuke: false };
        fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
        return defaultSettings;
    }
}

// Save settings to the file
function saveSettings(settings) {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
}

module.exports = { loadSettings, saveSettings };
