const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {ActivityType } = require('discord.js');
const config = require('../../botconfig.json')

module.exports = {
    name: "ready",
    
    run: async (client) => {  
       
        const rest = new REST({ version: '9' }).setToken(client.token);
        try {
            // First clear existing commands
            if (config.debug.active) {
                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, config.debug.guildid),
                    { body: [] }
                );
                // Then register new commands
                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, config.debug.guildid),
                    { body: client.slashcommands },
                );
            } else {
                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: [] }
                );
                // Then register new commands
                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: client.slashcommands },
                );
            }
        } catch (error) {
            console.error(error);
        }
        console.log(`${client.user.username} has started`)
        update()

    
        function update(){
            if(client.maintanance == true){
                client.user.setPresence({
                    activities: [{ name: "MAINTANANCE" }],
                    status: 'dnd',
                  });
                  setTimeout(function(){
                    update()
                },10000)                  
                return
            }
            
            // Combine the presence update into one condition
            client.user.setPresence({
                activities: [{ name: client.statustext+" | "+client.guilds.cache.size+" servers" }],
                status: client.used ? 'online' : 'idle'
            });

            setTimeout(function(){
                update()
            },1000)
        } 
    }
}