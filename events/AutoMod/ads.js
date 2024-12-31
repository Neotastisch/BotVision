const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "messageCreate",
    run: (client, message) => {
        try{

            if(message.channel.type === 'dm')return
            
            if(message.author.bot)return;
            const { PermissionsBitField } = require('discord.js');
            if(message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))return
            
            if(message.content.includes("https://discord.gg/"))log("📮AD detected📮", "Type: Discord Invite Link ("+message.content+") in #"+message.channel.name, "by @"+message.author.tag,message.guild.id)
            
        

            
        }catch(err){console.log(err);}      
        
        async function log(title, message, footer, guildid2){
          message.delete()
          if(await client.data.get(message.guild.id+"-LOGCHANNEL") == "None")return
            try{
              let embed = new EmbedBuilder()
              .setColor('#03c2fc')
              .setTitle(title)
              .addFields([
                {name: message, value: footer}
                ])
              client.channels.cache.get(client.data[guildid2].logchannel).send({embeds: [embed]})
            }catch(err){
                //console.log(err);
            }
            }

    }
}