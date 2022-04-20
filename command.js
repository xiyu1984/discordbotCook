const { DiscordRequest } = require('./utils.js');

/*
  * For Guild commands
*/

module.exports = {
// get all 
async getAllGuildCommandsID(appId, guildId) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    console.log(endpoint);

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    console.log(data);

    if (data) {
      var cmdDict = {};
      const installedNames = data.map((c) => {
        cmdDict[c['name']] = c['id'];
        return c['id'];
      });
      return cmdDict;
    }
  } catch (err) {
    console.error(err);
  }
},

// get one by name
async getGuildCommandID(appId, guildId, commandName) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  
  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      var id = -1;
      data.map((c) => {
        if (c['name'] === commandName){
          id = c['id'];
        }
      });
      return id;
    }
  } catch (err) {
    console.error(err);
  }
},

// install or update one by command json
async updateGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
},

// delete all guild commands
async clearAllGuildCommand(appId, guildId) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      const installedNames = data.map((c) => c['id']);

      var idx;
      for (idx in installedNames){
        const res = await DiscordRequest(endpoint+`/${installedNames[idx]}`, {method: 'DELETE'});
      }
    }
  } catch (err) {
    console.error(err);
  }
},

// delete one guild command by name
async deleteGuildCommand(appId, guildId, commandName) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  
  try {
    const id = await getGuildCommandID(appId, guildId, commandName);
    
    await DiscordRequest(endpoint+`/${id}`, {method: 'DELETE'});
  } catch (err) {
    // console.error(err);
  }
},

async getEmoji(appId, guildId) {
  const endpoint = `guilds/${guildId}/emojis`;
  
  try {
    return await DiscordRequest(endpoint, {method: 'GET'});
  } catch (err) {
    // console.error(err);
  }
},

};