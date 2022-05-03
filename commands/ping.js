const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal  } = require('discord-modals')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

    const modal = new Modal() // We create a Modal
      .setCustomId('modalone')
      .setTitle('Test of Discord-Modals!')
      .addComponents(
        new TextInputComponent() // We create a Text Input Component
        .setCustomId('onetext')
        .setLabel('Some text Here')
        .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        .setMinLength(4)
        .setMaxLength(10)
        .setPlaceholder('Write a text here')
        .setRequired(true) // If it's required or not
      );
    
    showModal(modal, {
      client: interaction.client, // Client to show the Modal through the Discord API.
      interaction: interaction // Show the modal with interaction data.
    })
	},
};