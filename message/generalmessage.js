const { MessageEmbed } = require('discord.js');

// The first message is for the channel itself
module.exports = [
    {
        data: {
                name: '<#965079827965165621>',
            },
        async execute(message) {
            const channel = message.client.channels.cache.get(message.channelId);
            // The `response information` below will be shown in the channel get a message
            // channel.send({content: `Hello, ${message.author.id}. Received message is: ${message.content}`});
            
            // DM to the message sender
            const embed = new MessageEmbed()
                                .setTitle('Hello friend!')
                                .setColor('#0099ff');
            message.client.users.fetch(message.author.id).then(user => {user.send({content: `Hello, ${message.author.id}. Received message is: ${message.content}`,
                                                                            embeds: [embed],});
            });
        },
    },
    {
        data: {
                name: '#activeone',
            },
        async execute(message) {
            const channel = message.client.channels.cache.get(message.channelId);
            // The `response information` below will be shown in the channel get a message
            channel.send({content: `Hello, ${message.author}. Received message is: ${message.content}`});
            // DM to the message sender
            message.client.users.fetch(message.author.id).then(user => {
                user.send({content: `Hello, ${message.author}. Received message is: ${message.content}`});
            });
        },
    },
  ];