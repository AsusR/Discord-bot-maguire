const firstMessage = require('./first-message')
module.exports = client => {
    const channelId = '790542617912803329';

 const getEmoji = (emojiName) => 
 client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        green: 'Green',
        purple: 'Purple'
    }

    const reactions = []

    let emojiText = 'Select Role by reacting to the emotes\n\n';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, reactions);

    // Handle reactions 
    const handleReaction = (reaction, user, add) => {
        if(user.id === '789858057567731722') {
            return
        }
        console.log(reaction)
        const emoji = reaction._emoji.name
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true)
        }
    })
    client.on('messageReactionRemove', (reaction, user) => {
        if(reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, false)
        }
    })
}
//work pls s ad