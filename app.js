const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed, WebhookClient } = require('discord.js');
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

client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./button').filter(file => file.endsWith('.js'));

for (const bfile of buttonFiles) {
	const buttonExe = require(`./button/${bfile}`);
  for (const buttonItem of buttonExe){
    client.buttons.set(buttonItem.data.name, buttonItem);
  }
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
	} else if (interaction.isButton()){
		const myButton = client.buttons.get(interaction.customId);

		if (!myButton) return;

		try {
			await myButton.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this selectMenu!', ephemeral: true });
		}
	}
});

// example for arbitrary message response in guild
client.on('messageCreate', message => {
	// send `response information` to the message sender and the related channel
	if (message.author.id != process.env.APP_ID) {
	  const channel = client.channels.cache.get(message.channelId);
	  // The `response information` below will be shown in the channel get a message
	  channel.send({content: `Hello, ${message.author.id}. Received message is: ${message.content}`});
	  // DM to the message sender
	  client.users.fetch(message.author.id).then(user => {
		user.send({content: `Hello, ${message.author.id}. Received message is: ${message.content}`});
	  });
	}
});
  
// example for `webhook`, which is bound to a concrete channel.
const webhookClient = new WebhookClient({ url: "https://discord.com/api/webhooks/970603264900993085/m2kmPNd5BgpO_K0w2EaMVcCfy5MfRjKkTR5uSnC9taqI_tatuUL1DKKNVUr2Y9_yAI_B" });

const embed = new MessageEmbed()
	.setTitle('Hello hook!')
	.setColor('#0099ff');

webhookClient.send({
	content: 'Webhook test',
	username: 'some-username',
	avatarURL: 'https://i.imgur.com/AfFp7pu.png',
	embeds: [embed],
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);