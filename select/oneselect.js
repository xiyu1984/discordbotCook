// const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: {
        name: 'oneselect',
    },
	async execute(interaction) {
		await interaction.update({ content: 'Something was selected!'+ interaction.values, components: []});
	},
};