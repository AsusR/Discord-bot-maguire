const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command');
const roleClaim = require('./role-claim');
const privateMessage = require('./private-message');
const poll = require('./poll');

client.on('ready', () => {
    console.log('The Client is ready');

    //Command Clear chat
    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
             });
            };
        });

        // create text channel commands
        command(client, 'createtextchannel', (message) => {
            const name = message.content.replace('!createtextchannel', '');

            message.guild.channels.create(name, {
                type: 'text',
            }).then(channel => {
                console.log(channel);
                const categoryId = '789786406464520195';
                channel.setParent(categoryId);
            });
        });
        // Create Voice Channel command
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

            // Git command for User Nuts
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

        // Server info command        
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

            // Help command

            command(client, 'help', message => {
                message.channel.send(
`**!help** - Displays the help menu
**!roll** - Rolls a random number between 1 and 100
**!serverinfo** - displays the servers info
**!git** - shows @nuts4008 github profile
**!createtextchannel** - create Text channel 
**!createvoicechannel** - create Voice channel`);
            });

            // Roll command

            command(client, 'roll', message => {
                const randomNumber = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                message.channel.send(`${message.author.toString()} Rolled ${randomNumber(1,100)}`);
            });

            // Set presence 
            const { prefix } = config;
            client.user.setPresence({
                activity: {
                    name: `Use "${prefix}help" for help`,
                }
            });

            // Roll claims
            roleClaim(client);
            
            // Ban anyone
            command(client, 'ban', message =>  {

                const { member, mentions } = message
                const tag = `<@${member.id}>`
                if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
                    const target = mentions.users.first();
                    if (target) {
                        const targetMember = message.guild.members.cache.get(target.id)
                        targetMember.ban()
                        message.channel.send(`${tag} That Guy has been ascended`);
                    } else {
                        message.channel.send(`${tag} Tag someone loser`)
                    }
                } else {
                    message.channel.send(`${tag} Haha Loser`);
                }
            });

            // Kick anyone 
            command(client, 'kick', message =>  {

                const { member, mentions } = message
                const tag = `<@${member.id}>`
                if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')){
                    const target = mentions.users.first();
                    if (target) {
                        const targetMember = message.guild.members.cache.get(target.id)
                        targetMember.kick()
                        message.channel.send(`${tag} That Guy cannot ascend He will return`);
                    } else {
                        message.channel.send(`${tag} Tag someone loser`)
                    }
                } else {
                    message.channel.send(`${tag} Haha Loser`);
                }
            });
            // Poll
            poll(client);
            
        }); //  CLient on ready ENDS HERE
        

client.login(config.token)