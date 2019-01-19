const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

const usualSuspects = {
  1: "Andrew",
  2: "Matt",
  3: "MD",
  4: "Max",
  5: "Mark",
  6: "Drew",
  7: "Erik",
}

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.includes("!spin")) {
      bot.sendMessage({
          to: channelID,
          message: usualSuspects[Math.floor(Math.random() * (7 - 1) + 1)]
      });
        // var args = message.substring(1).split(' ');
        // var cmd = args[0];
        // args = args.splice(1);
        // switch(cmd) {
        //     // !spin
        //     case 'spin':
        //
        //     break;
        //     // Just add any case commands if you want to..
        //  }
     }
});
