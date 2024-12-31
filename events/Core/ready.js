const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = {
    name: "ready",
    
    run: async (client) => {  
        const rest = new REST({ version: '9' }).setToken(client.token);
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                
                { body: client.slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
        console.log(`${client.user.username} has started`)
        client.user.setStatus('online')
        client.user.setPresence({
        game: {
            name: 'Use ?help',
            type: "Playing",
        }
    });
        
    }
}