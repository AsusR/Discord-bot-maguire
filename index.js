const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message');
const privateMessage = require('./private-message');

client.on('ready', () => {
    console.log('The Client is ready');

    //Command 1
    // command(client, ['ping', 'test', 'hello'], message => {
    //     message.channel.send('Pong!');
    // });

    // //Command 2
    // command(client, 'servers', message => {
    //     client.guilds.cache.forEach(guild => {
    //         message.channel.send(`${guild.name} has total of ${guild.memberCount} members`)
    //     });
    // });

    // //Command 3 
    // command(client, ['cc', 'clearchannel'], message => {
    //     if (message.member.hasPermission('ADMINISTRATOR')) {
    //         message.channel.messages.fetch().then(results => {
    //             message.channel.bulkDelete(results)
    //          });
    //         };
    //     });

    //     //Command 4
    //     command(client, 'status', message => {
    //         const content = message.content.replace('!status ', '');
    //         // "!status something" if didnt replace status becomes "!status something" using replace it becomes "something"
       
    //         client.user.setPresence({
    //             activity: {
    //                 name: content,
    //                 type: 0
    //             }
    //         })
    //     });
    //     // Sends a message on the channel if exist edits it else sends a new message
       // firstMessage(client, '789889036562726922', 'hello world!!!', ['🔥', '🚒'])
        
        // privateMessage(client, 'ping', 'Pong!');
        // client.users.fetch('352385166410514434').then(user => {
        //     user.send('You have summoned me');
        // })
        command(client, 'createTextChannel', (message) => {
            const name = message.content.replace('!createTextChannel', '');

            message.guild.channels.create(name, {
                type: 'text',
            }).then(channel => {
                console.log(channel);
                const categoryId = '789786406464520195';
                channel.setParent(categoryId);
            });
        });
            command(client, 'createvoicechannel', (message) => {
                const name = message.content.replace('!createvoicechannel', '');

                message.guild.channels.create(name, {
                    type: 'voice',
                }).then((channel) => {
                    const categoryId = '789786406464520196';
                    channel.setParent(categoryId);
                    channel.setUserLimit(10);
                } );
            });
        command(client, 'git', (message) => {
            const imgEmb = 'https://avatars1.githubusercontent.com/u/72810501?s=400&v=4'
            const embed = new Discord.MessageEmbed()
            .setTitle('Nuts Github')
            .setURL('https://github.com/AsusR')
            .setAuthor(message.author.username)
            .setFooter('Git Profile', imgEmb)
            .setColor('f4f4f4')
            message.channel.send(embed);
            
        });
        command(client, 'serverinfo', message => {
            const { guild } = message;
            const { name, region, memberCount, owner, afkTimeout } = guild
            const icon = guild.iconURL();
           const embed = new Discord.MessageEmbed()
           .setTitle(`Server info for "${name}"`)
           .setThumbnail(icon)
           .addFields({
            name: 'Region',
            value: region,
       },{
            name: 'Members',
            value: memberCount,
         },{
            name: 'Our leader',
            value: owner.user.tag,
          },{
            name: 'AFK Timeout in Minutes',
            value: afkTimeout / 60,
           })   
           message.channel.send(embed);
            });

            command(client, 'help', message => {
                message.channel.send('help coming soon');
            });

            
        }); //  CLient on ready ENDS HERE
   

client.login(config.token)