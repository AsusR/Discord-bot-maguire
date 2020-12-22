module.exports = client => {
    const channelIds = [
       '790875077251301377' // poll-suggestions 
    ]

    const addReactions = message => {
        message.react('⏫')

        setTimeout(() => {
            message.react('⏬')
        }, 750)
    }

    client.on('message', async (message) => {
        if (channelIds.includes(message.channel.id)){
            addReactions(message)
        } else if(!channelIds && message.content.toLowerCase() === '!poll') {
            await message.delete()

            const fetched = await message.channel.messages.fetch({ limit: 1 })
            if(fetched && fetched.first()){
                addReactions(fetched.first());
            }
        }
    });
}