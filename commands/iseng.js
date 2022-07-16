const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('iseng')
    .setDescription('Iseng banget deh kamu'),
  async execute(interaction) {
    const RANDOM = Math.floor(Math.random() * 10);
    interaction.channel.messages.fetch({ limit: 10 }).then((messages) => {
      let message = messages.at(RANDOM);
      interaction.channel.send(`Dor <@${message.author.id}>`);
      interaction.reply({
        content: 'Iseng banget kamu yaa',
        ephemeral: true,
      });
    });
  },
};
