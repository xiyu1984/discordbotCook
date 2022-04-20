const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('query-nft')
		.setDescription('query all NFTs!'),
	async execute(interaction) {
		await interaction.reply('Here we go!');
	},
};
