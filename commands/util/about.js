const discord = require('discord.js')
const {ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js")
module.exports = {
  name: 'about',
  description: 'Shows information about the bot',
  shown: true,
    interactions: true,
  neoonly: false,
  permissions: [],
  async execute(client, args, msg ) {
    String.prototype.toHHMMSS = function () {
      var sec_num = parseInt(this, 10); // don't forget the second param
      var days = Math.floor(sec_num / (3600 * 24));
      var hours = Math.floor((sec_num - (days * (3600 * 24))) / 3600);
      var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
      var seconds = sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60);

      if (hours < 10) {hours = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return days+':'+hours+':'+minutes+':'+seconds;
  }
const message = msg

var time = process.uptime();
var uptime = (time + "").toHHMMSS();
let embed = new discord.EmbedBuilder()
embed.setTitle("❓ Stats ❓")
embed.addFields({name: "Uptime: " ,value: uptime})
embed.addFields({name: "Servers: " ,value: client.guilds.cache.size+" "})
embed.setTimestamp()

const m = await message.reply({embeds:[embed]})
  },
};