const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

const usualSuspects = {
  1: "*Andrew*",
  2: "*Matt*",
  3: "*MD*",
  4: "*Max*",
  5: "*Mark*",
  6: "*Drew*",
  7: "*Erik*",
  8: "*Me*",
  9: "*Kyle*",
}

const slams = {
  1: "Slack-jawed yokel",
  2: "Sluggish, lazy, stupid, and unconcerned",
  3: "Dingus",
  4: "Dink",
  5: "uhhh...big dummy",
  6: "Rotisserie shithead",
  7: "Fuckin' moron",
  8: "McLovin-ass piece of shit",
  9: "Fuckin' ballbag",
  10: "Dumb, stupid, pathetic, weak, white....uhhh...white guilt...white guilt, milquetoast piece of human garbage",
  11: "Light-roasted corporate whore"
  12: "Sack of a man"
  13: "Pile of ropes on a trash heap"
  14: "Human toilet"
  15: "Big Galoomba"
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
          message: usualSuspects[Math.floor(Math.random() * (10 - 1) + 1)]
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
  if(message.includes("!slam")) {
    bot.sendMessage({
        to: channelID,
        message: slams[Math.floor(Math.random() * (16 - 1) + 1)]
    });
  }
});
