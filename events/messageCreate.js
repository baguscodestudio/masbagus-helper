module.exports = {
  name: 'messageCreate',
  async execute(message) {
    let urlRegex = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    let codeRegex = new RegExp('```', 'g');
    const SHARING_CHANNELS = [
      '690042077303930894',
      '968721545054810152',
      '817182866252234762',
      '817183333149573171',
      '817205303170695208',
      '835011845072224256',
      '821591833662324736',
      '954264028572688404',
    ];
    if (SHARING_CHANNELS.includes(message.channelId) && !message.author.bot) {
      if (
        !urlRegex.test(message.content) &&
        message.attachments.size === 0 &&
        !codeRegex.test(message.content)
      ) {
        setTimeout(() => message.delete(), 5000);
        message
          .reply(
            `<@${message.author.id}> mohon menggunakan channel sesuai tempatnya. <#684931531751292939>\nJika ingin bertanya atau request silahkan ke <#825798640580689961>.`
          )
          .then((msg) => setTimeout(() => msg.delete(), 5000));
      }
    }
    const TAKEROLE = ['833603821149224980'];
    if (TAKEROLE.includes(message.channelId) && !message.author.bot) {
      if (
        message.content.toLowerCase() == 'english' ||
        message.content.toLowerCase() == 'indonesia'
      ) {
        setTimeout(() => message.delete(), 15000);
        if (message.content.toLowerCase() == 'english') {
          let role = await message.guild.roles.cache.find(
            (role) => role.name === 'English'
          );
          message.member.roles.add(role);
        } else if (message.content.toLowerCase() == 'indonesia') {
          let role = message.guild.roles.cache.find(
            (role) => role.name === 'Indonesia'
          );
          message.member.roles.add(role);
        }
        message
          .reply(
            `Thanks <@${message.author.id}> for taking your role! Feel free to browse the discord!`
          )
          .then((msg) => setTimeout(() => msg.delete(), 10000));
      } else {
        setTimeout(() => message.delete(), 5000);
        message
          .reply(
            `<@${message.author.id}> invalid input! Please type either **english** or **indonesia**!`
          )
          .then((msg) => setTimeout(() => msg.delete(), 10000));
      }
    }
  },
};
