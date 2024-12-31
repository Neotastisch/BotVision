const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = (client, path) => {
    //Load Commands
    const CommandsFolder = fs.readdirSync(`${path}/commands`)
    for (folder of CommandsFolder)
    {
        let commandCategory = fs.readdirSync(`${path}/commands/${folder}`).filter(file => file.endsWith('.js'))
        for(file of commandCategory)
        {
            const command = require(`../commands/${folder}/${file}`)
            //const subCommand = new SlashCommandBuilder().setName(String(command.name).replace(/\s+/g, '_').toLowerCase()).setDescription(String(command.description));
            if(!command.name) return console.error(`Name Not Given In ${file}`)
            client.commands.set(command.name, command)
            let description = command.description
            if(!description || description == "")description = "Not given"
            if(!command.args && command.interactions){
                let scb = new SlashCommandBuilder()
                scb.setName(command.name)
                scb.setDescription(description).toJSON()
                client.slashcommands.push(scb)
            }
            if(command.aliases) client.aliases.set(command.aliases, command.name)
                


        }
    }
}