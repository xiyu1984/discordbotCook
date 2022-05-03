const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed, WebhookClient } = require('discord.js');
const denv = require ('dotenv/config');
const { ClientRequest } = require('node:http');
const discordModals = require('discord-modals') // Define the discord-modals package!

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

// example for input text
client.modals = new Collection();
const modalFiles = fs.readdirSync('./modal').filter(file => file.endsWith('.js'));

for (const modalfile of modalFiles) {
	const modalItem = require(`./modal/${modalfile}`);
  client.modals.set(modalItem.data.name, modalItem);
}

client.on('modalSubmit', async (modal) => {
  const modalExe = client.modals.get(modal.customId );
  
  if (!modalExe) return;
  
  try {
    await modalExe.execute(modal);
  } catch (error) {
    console.error(error);
  }
});

// client.on('guildMemberAdd', member => {
  
// });

// example for arbitrary message response in guild
client.recvMessages = new Collection();
const msgFiles = fs.readdirSync('./message').filter(file => file.endsWith('.js'));

for (const mfile of msgFiles) {
	const msgExe = require(`./message/${mfile}`);
	for (const msgItem of msgExe){
		client.recvMessages.set(msgItem.data.name, msgItem);
	}
}

client.on('messageCreate', async message => {
	// send `response information` to the message sender and the related channel
	if (message.author.id != process.env.APP_ID) {
		const messageExe = client.recvMessages.get(message.content);

    // messages that do not reqiere special handling
		if (!messageExe) {
			// const channel = client.channels.cache.get(message.channelId);
      		// channel.send({content: `Hello, ${message.author.id}. Received message is: ${message.content}. I don't know what's its meaning.`});
			console.log(`Hello, ${message.author.id}. Received message is: ${message.content}. I don't know what's its meaning.`);
      		return;
		}

		try {
			await messageExe.execute(message);
		} catch (error) {
			console.error(error);
		}
	}
});

// example for `webhook`, which is bound to a concrete channel.
const webhookClient = new WebhookClient({ url: process.env.GENERAL_HOOK });

const embed = new MessageEmbed()
	.setTitle('Hello hook!')
	.setColor('#0099ff');

webhookClient.send({
	content: 'Webhook test',
	username: 'some-username',
	avatarURL: 'https://i.imgur.com/AfFp7pu.png',
	embeds: [embed],
});

// without the below line, `client.on('modalSubmit'...` will not work
discordModals(client); 

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);