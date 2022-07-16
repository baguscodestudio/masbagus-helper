require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
  name: 'ready',
  once: true,
  execute(client, commands) {
    const CLIENT_ID = client.user.id;

    const rest = new REST({
      version: '9',
    }).setToken(process.env.TOKEN);

    setInterval(() => {
      client.guilds.fetch(process.env.GUILD_ID).then((guild) => {
        client.user.setPresence({
          activities: [
            { name: `${guild.memberCount} members`, type: 'WATCHING' },
          ],
          status: 'online',
        });
      });
    }, 10000);

    (async () => {
      try {
        if (process.env.ENV === 'production') {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log('Successfully registered commands globally.');
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log('Successfully registered commands locally.');
        }
      } catch (err) {
        if (err) console.error(err);
      }
    })();
  },
};
