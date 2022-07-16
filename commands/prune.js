const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Delete multiple messages')
    .addIntegerOption((option) =>
      option
        .setName('messages')
        .setDescription('Messages Amount')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.memberPermissions.has('ADMINISTRATOR')) {
      interaction.reply('You do not have enough permission!');
      return;
    }
    interaction.channel
      .bulkDelete(interaction.options.getInteger('messages'))
      .then((messages) =>
        interaction.reply(`Deleted ${messages.size} messages`)
      )
      .catch(console.error);
  },
};
