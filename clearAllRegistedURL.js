const Command = require('./command.js')
require ('dotenv/config');

console.log((async ()=>{
    const res = await Command.getAllGuildCommandsID(process.env.APP_ID, process.env.GUILD_ID);
    return res;
})());

(async ()=>{
    await Command.clearAllGuildCommand(process.env.APP_ID, process.env.GUILD_ID)
})();

console.log((async ()=>{
    const res = await Command.getAllGuildCommandsID(process.env.APP_ID, process.env.GUILD_ID);
    return res;
})());
