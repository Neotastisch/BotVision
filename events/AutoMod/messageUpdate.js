const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "messageUpdate",
    run: async (client, oldMessage,newMessage) => {
        try{

            if(newMessage.channel.type === 'dm')return
            if(await client.data.get(newMessage.guild.id+"-LOGCHANNEL") == "None")return 
            if(oldMessage.content == newMessage.content) return
            const { PermissionsBitField } = require('discord.js');
            if(oldMessage.member.permissions.has(PermissionsBitField.Flags.ManageMessages))return
            if(newMessage.author.bot)return; 
            //TODO Administrator ignored
            log("💱Message edited💱", "Old message: \""+oldMessage.content+"\", New message: \""+newMessage.content+"\" in #"+newMessage.channel.name, "by @"+newMessage.author.tag,newMessage.guild.id)
        }catch(err){console.log(err);}      
        
        async function log(title, message, footer, guildid2){
            try{
              let embed = new EmbedBuilder()
              .setColor('#03c2fc')
              .setTitle(title)
              .addFields([
                {name: newMessage, value: footer}
                ])
             client.channels.cache.get(await client.data.get(message.guild.id+"-LOGCHANNEL")).send({embeds: [embed]})
            }catch(err){
                //console.log(err);
            }
            }

    }
}