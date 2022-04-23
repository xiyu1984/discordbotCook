# Discord bot cooking

Currently, this templete just provide the slash command framework. Other functions will be added soon.

## Framework

`app.js`, `deploy.js`, `utils.js`, `command.js` are basic framework for a discord bot.

* `app.js` implements the main process flow.
* `deploy.js` register and publish new public slash commands to related discord guild.
* `utils.js` and `command.js` provide some basical tools with original api.

## example
* dir `./commands` is for slash command, one can develop their own slash commands there.
* dir `./button` is for buttons components.
* dir `./select` is for selectMenu components.

