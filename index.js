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
            console.log(guild);
        });
    });
});

client.login(config.token);