const discord = require('discord.js')
const voiceCollection = new discord.Collection()
module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    description: "Join to create channel",
    run: async(client, oldState, newState) => {
        const {member,guild} = newState
        let oldChannel = oldState.channel
        let newChannel = newState.channel

        if(oldChannel !== newChannel && newChannel && newState.channel.name.includes("JoinToCreate")){
            const voiceChannel = await guild.channels.create(member.user.tag, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionOverwrites:[
                    {id: member.id, allow:["CONNECT", "MANAGE_CHANNELS","PRIORITY_SPEAKER","VIEW_CHANNEL","DEAFEN_MEMBERS","MUTE_MEMBERS","STREAM"]},
                    {id: guild.id, allow:["CONNECT"]}
                ]
            })
            client.voiceGenerator.set(member.id, voiceChannel.id);
            await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30*1000)

            return setTimeout(()=> member.voice.setChannel(voiceChannel),500);
        }
        const ownedChannel = client.voiceGenerator.get(member.id)

        if(ownedChannel && oldChannel.id == ownedChannel && (!newChannel ||newChannel.id !== ownedChannel)){
            client.voiceGenerator.set(member.id, null)
            oldChannel.delete().catch(()=> {});
        }
    },
};