const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prunespecial')
    .setDescription('Delete multiple messages without url or image')
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
    let urlRegex = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    let codeRegex = new RegExp('```', 'g');
    let count = 0;
    interaction.channel.messages
      .fetch({ limit: interaction.options.getInteger('messages') })
      .then((messages) => {
        messages.map((message) => {
          if (
            !urlRegex.test(message.content) &&
            message.attachments.size === 0 &&
            !codeRegex.test(message.content)
          ) {
            message.delete();
            count++;
          }
        });
        interaction.reply(`Deleted ${count} messages`);
        setTimeout(() => interaction.deleteReply(), 10000);
      });
  },
};
