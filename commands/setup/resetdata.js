const discord = require("discord.js")
const fs = require("fs")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'resetdata',
    description: 'Resets every server setting',
    shown: false,
    permissions: ["ADMINISTRATOR"],
    execute(client, args, msg) {
        const bot = msg.client
        const { data } = msg.client
        let serverstats = client.data

        serverstats[message.guildId] = {
            
          }
          fs.writeFile("./serverdata.json", JSON.stringify(serverstats, null, "\t"), function (err) {
            if (err) console.log(err)
          })
          client.data = serverstats
    },
};