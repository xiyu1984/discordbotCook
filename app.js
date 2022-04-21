const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const denv = require ('dotenv/config');
const { ClientRequest } = require('node:http');

// Create a new client instance
const client = new Client({
  intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.selectMenu = new Collection();
const selectFiles = fs.readdirSync('./select').filter(file => file.endsWith('.js'));

for (const sfile of selectFiles) {
	const selectExe = require(`./select/${sfile}`);
	client.selectMenu.set(selectExe.data.name, selectExe);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

	if (interaction.isCommand()){
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else if(interaction.isSelectMenu()){
		const mySelect = client.selectMenu.get(interaction.customId);

		if (!mySelect) return;

		try {
			await mySelect.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this selectMenu!', ephemeral: true });
		}
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);