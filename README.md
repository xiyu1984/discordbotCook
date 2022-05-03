# Discord bot cooking

Currently, this templete just provide the slash command, components(button, select manue, text input), and message framework. Other functions will be added soon.

## Framework

`app.js`, `deploy.js`, `utils.js`, `command.js`, `clearAllRegisteredURL.js` are basic framework for a discord bot.

* `app.js` implements the main process flow.
* `deploy.js` register and publish new public slash commands to related discord guild.
* `utils.js` and `command.js` provide some basical tools with original api.
* `clearAllRegisteredURL.js` removes all the registered commands.

## example
* dir `./commands` is for slash command, one can develop their own slash commands there.
    *  `ping.js` in `./commands` makes an example of `text input` component, which is not directly supported by `MessageActionRow` or `BaseMessageComponent`. `text input` is a special component based on `modal`. 
* dir `./button` is for buttons components.
* dir `./select` is for selectMenu components.
* dir `./message` is for responses to some user defined channel messages.
* dir `./modal` is for responses to modal such as `text input`.

