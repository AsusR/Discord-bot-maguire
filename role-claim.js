const firstMessage = require('./first-message')
module.exports = client => {
    const channelId = '790542617912803329';

    const getEmoji = emojiName => {
        client.emojis.cache.find(emoji => {
            emoji.name === emojiName
        })
    }
    const emojis = {
        role1 : 'suprise',
        role2 : 'sadge'
    }

    const reactions = []

    let emojiText = 'Select Role by reacting to the emotes';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, []);
}
//work pls