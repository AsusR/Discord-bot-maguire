module.exports = client => {
    const channelIds = [
        '790875077251301377' // poll-suggestions 
    ]

    const addReactions = message => {
        message.react(':upvote:')

        setTimeout(() => {
            message.react(':downvote:')
        }, 750)
    }

    client.on('message', message => {
        if (channelIds.includes(message.channel.id)){
            addReactions(message)
        }
    })
}