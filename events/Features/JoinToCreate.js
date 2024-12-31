const discord = require('discord.js')
const voiceCollection = new discord.Collection()

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    description: "Join to create channel",
    run: async(client, oldState, newState) => {
        try {
            const {member, guild} = newState;
            if (!member || !guild) return; // Safety check

            const oldChannel = oldState.channel;
            const newChannel = newState.channel;

            // Initialize voiceGenerator if it doesn't exist
            if (!client.voiceGenerator) {
                client.voiceGenerator = new discord.Collection();
            }

            if (oldChannel !== newChannel && newChannel && newChannel.name.includes("JoinToCreate")) {
                try {
                    const voiceChannel = await guild.channels.create({
                        name: member.user.tag,
                        type: discord.ChannelType.GuildVoice,
                        parent: newChannel.parent,
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: ["Connect", "ManageChannels", "PrioritySpeaker", "ViewChannel", "DeafenMembers", "MuteMembers", "Stream"]
                            },
                            {
                                id: guild.id,
                                allow: ["Connect"]
                            }
                        ]
                    });

                    client.voiceGenerator.set(member.id, voiceChannel.id);
                    
                    // Prevent user from joining the template channel again
                    await newChannel.permissionOverwrites.edit(member, {Connect: false});
                    setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

                    // Move member to new channel
                    return setTimeout(() => {
                        if (member.voice.channel) {
                            member.voice.setChannel(voiceChannel).catch(console.error);
                        }
                    }, 500);
                } catch (err) {
                    console.error('Error creating voice channel:', err);
                    return;
                }
            }

            // Handle channel deletion
            const ownedChannel = client.voiceGenerator.get(member.id);
            if (ownedChannel && oldChannel && oldChannel.id === ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
                client.voiceGenerator.delete(member.id);
                try {
                    await oldChannel.delete();
                } catch (err) {
                    console.error('Error deleting voice channel:', err);
                }
            }
        } catch (err) {
            console.error('Error in JoinToCreate event:', err);
        }
    },
};