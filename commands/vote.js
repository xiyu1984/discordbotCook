const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the NFT you like'),

  async execute(interaction) {
    console.log(interaction.options);
    console.log(interaction.options.getString('input'));

    const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('oneselect')
                            .setPlaceholder('Nothing selected')
                            .addOptions([
                                {
                                    label: 'NFT one',
                                    description: '1',
                                    value: 'first_option',
                                },
                                {
                                    label: 'NFT two',
                                    description: '2',
                                    value: 'second_option',
                                },
                                {
                                    label: 'NFT three',
                                    description: '3',
                                    value: 'third_option',
                                },
                            ]),
                    );
    
    const em = new MessageEmbed().setImage('https://cdn.discordapp.com/attachments/965079827965165621/965930738866356264/AltaFloresta_ZH-CN9153671055_1920x1080.jpg');

    await interaction.reply({ content: 'Make your choice!', embeds: [em], components: [row], ephemeral: true} );
  },
};