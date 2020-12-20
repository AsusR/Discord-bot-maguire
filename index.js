const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command')

client.on('ready', () => {
    console.log('The Client is ready');

    //Command 1
    command(client, ['ping', 'test', 'hello'], message => {
        message.channel.send('Pong!');
    });

    //Command 2
    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has total of ${guild.memberCount} members`)
        });
    });

    //Command 3 
    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
    }
});

client.login(config.token);