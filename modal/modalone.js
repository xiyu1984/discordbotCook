// const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: {
        name: 'modalone',
    },
	async execute(modal) {
		const firstResponse = modal.getTextInputValue('onetext');
        await modal.deferReply({ ephemeral: true })
        modal.followUp({content: 'Congrats! Powered by discord-modals.' + firstResponse, ephemeral: true});
	},
};