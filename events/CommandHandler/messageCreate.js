const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
        //console.log(message);
        try{
            let prefix = await client.data.get(message.guild.id+"-PREFIX") || "?"
            
        
        const args = message.content.trim().slice(prefix.length).split(" ")

        const command = args.shift().toLowerCase()

        if (!message.content.startsWith(prefix)) return;
        if(message.author.bot)return;

        if(client.maintanance == true && message.author.id !== client.neoid) return message.reply({embeds: [client.maintananceEmbed]})
        let cmd = client.commands.get(command || client.aliases.get(command))
        if(!cmd) return;
        
        if(cmd.permissions)
        {
            cmd.permissions.forEach(permission => {
                if(!message.member.permissions.has(permission)){
                    return message.reply({embeds: [client.noperms]})
                } 
            });
        }
        
        if(!cmd.neoonly || message.author.id == client.neoid){
            client.used = true
            cmd.execute(client, args, message)
        }
    }catch(err){
        console.log("Error in messageCreate.js:");
        console.log(err);
    }         
        
        

    }
}