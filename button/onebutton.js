// const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
    {
        data: {
                name: 'onebutton',
            },
        async execute(interaction) {
            const output = `Something was buttoned! ${interaction.customId}`;
            await interaction.reply({ content: output, components: []});
        },
    },
    {
        data: {
                name: 'buttonTwo',
            },
        async execute(interaction) {
            const output = `Something was buttoned! ${interaction.customId}`;
            await interaction.reply({ content: output, components: []});
        },
    },
    {
        data: {
              name: 'buttonThree',
          },
        async execute(interaction) {
          const output = `Something was buttoned! ${interaction.customId}`;
          await interaction.reply({ content: output, components: []});
        },
    },
    {
        data: {
                name: 'buttonFour',
            },
        async execute(interaction) {
            const output = `Something was buttoned! ${interaction.customId}`;
            await interaction.reply({ content: output, components: []});
        },
    },
    {
        data: {
                name: 'buttonFive',
            },
        async execute(interaction) {
            const output = `Something was buttoned! ${interaction.customId}`;
            await interaction.reply({ content: output, components: []});
        },
    },
  ];