const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
      var Filter = require('bad-words'),
      filter = new Filter();
        try{


            if(message.channel.type === 'dm')return
            
            if(message.author.bot)return; 
            if(filter.isProfane(message.content) == false) return
            const { PermissionsBitField } = require('discord.js');
            if(message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))return
          
            message.delete()
            message.channel.send("**"+message.author.tag+"**: "+filter.clean(message.content))
            message.author.send("Please stop **swearing** ("+filter.clean(message.content)+")")
            if(await client.data.get(message.guild.id+"-LOGCHANNEL") == "None")return 

            log("🤬Swearword detected🤬", "Filtered Content: \""+filter.clean(message.content)+"\" in #"+message.channel.name, "by @"+message.author.tag,message.guild.id)
        }catch(err){console.log(err);}      
        
        async function log(title, message, footer, guildid2){
            try{
              let embed = new EmbedBuilder()
              .setColor('#03c2fc')
              .setTitle(title)
              .addFields([
                {name: message, value: footer}
                ])
              client.channels.cache.get(await client.data.get(message.guild.id+"-LOGCHANNEL")).send({embeds: [embed]})
            }catch(err){
                //console.log(err);
            }
            }

    }
}