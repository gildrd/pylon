const commands = new discord.command.CommandGroup({
  defaultPrefix: '!' // You can customize your default prefix here.
});


/******************************************************
 *      Petits jeux de hazard pour se faire la main   *
*******************************************************/

commands.raw(
  { name: 'action', filters: discord.command.filters.canSpeak() },
  async (message) => {
    const args = message.content.trim().split(' ');

    if (args.length === 1) {
      message.reply('Ajoute un argument, Billy ! (facile / moyen / difficile)');
      return;
    } else if (args.length > 2) {
      message.reply("Y a trop d'arguments, Billy !");
      return;
    }

    const command = args[1].toLowerCase();
    const number = Math.floor(Math.random() * 20) + 1;

    if (number === 1) {
      message.reply('BAM ! Echec critique !');
      return;
    }

    if (number === 20) {
      message.reply('Bien joué ! Réussite critique !');
      return;
    }

    if (command === 'facile') {
      if (number >= 5) {
        message.reply("C'était facile. Ca passe crème.");
      } else {
        message.reply("Pas d'bol. C'est raté.");
      }
    } else if (command === 'moyen') {
      if (number >= 10) {
        message.reply("Ca passe. C'était dans tes moyens.");
      } else {
        message.reply("Pas d'bol. C'est raté.");
      }
    } else if (command === 'difficile') {
      if (number >= 15) {
        message.reply("Bien joué ! C'était pas gagné d'avance.");
      } else {
        message.reply("Pas d'bol. C'est raté.");
      }
    } else {
      message.reply(
        'Bien tenté Billy, mais il faut un niveau réaliste ! (facile / moyen / difficile)'
      );
    }
  }
);

commands.raw(
  { name: 'roll', filters: discord.command.filters.canSpeak() },
  async (message) => {
    let number = (Math.floor(Math.random() * 20) + 1).toString();

    message.reply(number);
    return;
  }
);

commands.raw(
  { name: 'pileface', filters: discord.command.filters.canSpeak() },
  async (message) => {
    let number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
      message.reply('pile');
    } else {
      message.reply('face');
    }
    return;
  }
);

/******************************************************
 *      Ajout de rôles et supression par cron        *
*******************************************************/
const greetings = ['yo', 'hey'];
const roleID = '';
const channelID = '';
const guildID = '';

const simpleKvn = new pylon.KVNamespace('myKvn');

discord.on('MESSAGE_CREATE', async (message) => {
  if (message.channelId == channelID) {
    for (let greeting of greetings) {
      if (message.content.toLowerCase().includes(greeting)) {
        await message.addReaction(discord.decor.Emojis.WAVE);

        message.member.addRole(roleID);
        
        simpleKvn.put(message.member.user.id, JSON.stringify(message.member), {
          ifNotExists: true,
        });
      }
    }
  }
});

pylon.tasks.cron('remove_peut_rp_role', '0 0 1 * * * *', async () => {
  const itemsPromise = simpleKvn.items();
  itemsPromise.then((items) => {
    for (let item of items) {
      const member = JSON.parse(item.value);

      const guildPromise = discord.getGuild(guildID);
      guildPromise.then((guild) => {
        const memberPromise = guild.getMember(member.user.id);

        memberPromise.then((member) => {
          member.removeRole(roleID);
          
          simpleKvn.delete(item.key);
        });
      });
    }
  });
});
