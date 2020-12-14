const commands = new discord.command.CommandGroup({
  defaultPrefix: '!' // You can customize your default prefix here.
});

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
