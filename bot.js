const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const logger = require('winston');
const { token } = require('./config.json');

const userMap = new Map();

userMap.set("Pyrrhus", "Matt");
userMap.set("Ayanowyn", "Andrew");
userMap.set("MyOnlyAlias", "MD");
userMap.set("maxbarnyard", "Max");
userMap.set("CombatPenguins", "Mark");
userMap.set("Immortal Jellyfish", "Drew");
userMap.set("snowstorm", "Erik")
userMap.set("Girl", "Virginia")

const usualSuspects = {
  1: "Andrew",
  2: "Matt",
  3: "MD",
  4: "Max",
  5: "Mark",
  6: "Drew",
  7: "Erik",
  8: "Virginia",
  9: "Ethan"
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
  10: "Dumb, stupid, pathetic, weak, white....uhhh...white guilt...white guilt, milquetoast piece of human garbage.",
  11: "Light-roasted corporate whore",
  12: "Sack of a man",
  13: "Pile of ropes on a trash heap",
  14: "Human toilet",
  15: "Big Galoomba",
  16: "Dumb, stupid, idiot, bad, ugly, no friends",
  17: "Yellow bellied varmint",
  18: "cocksocket",
  19: "applesauce suckin' crumb bun",
  20: "stupid little brick ass head",
  21: "accolade chasing rat freak",
  22: "burnt mistake",
  23: "basic bitch",
  24: "jerk chicken",
  25: "dumb(stupid)",
  26: "piece of bitch",
  27: "a heap of garbage dressed like a man",
  28: "gung ho little lad",
  29: "lip shucking dip sticker",
  30: "dumb candy boy with a soft doughy body",
  31: "fatty fatty no parents",
  32: "poopoo peepee bitch boy",
  33: "applebottomed ulcer",
  34: "dizzy bitch",
  35: "glumpus",
  36: "butt dingus berry boy"
}

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
]});

bot.on('ready', function (evt) {
    logger.info('Connected');
});

let timedOut = [];

const commands = [
	new SlashCommandBuilder().setName('wheel').setDescription('Hello!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]

bot.on('interactionCreate', async interaction => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

  let randomRolledUser = usualSuspects[Math.floor(Math.random() * (10 - 1) + 1)];  
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'wheel') {
    await interaction.reply('Hello!');
  }
  else if(commandName === 'spin') {
    await interaction.reply(usualSuspects[Math.floor(Math.random() * (10 - 1) + 1)]);
  }
  else if(commandName === 'slam') {
    await interaction.reply(slams[Math.floor(Math.random() * (37 - 1) + 1)]);
  }
  else if(commandName === 'spinslam') {
    await interaction.reply(userMap.get(interaction.user.username) + ` thinks ${randomRolledUser === userMap.get(interaction.user.username) ? 
      randomRolledUser !== "Virginia" ? "he's" : "she's" : randomRolledUser + " is" } a ${slams[Math.floor(Math.random() * (37 - 1) + 1)]}`);
  }

  
    
    
    // if(timedOut.includes(message.author.username)) {
    //   await message.delete();
    // }
    // if(message.content.includes("!slam") && message.content.includes("!spin")) {
    //   message.channel.send(userMap.get(message.author.username) + ` thinks ${randomRolledUser === userMap.get(message.author.username) ? randomRolledUser !== "Virginia" ? "he's" : "she's" : randomRolledUser + " is" } a ${slams[Math.floor(Math.random() * (37 - 1) + 1)]}`);
    // }
    // else {
    //   if (message.content.includes("!spin")) {
    //     await message.channel.send(usualSuspects[Math.floor(Math.random() * (10 - 1) + 1)]);
    //   }
    //   if(message.content.includes("!slam")) {
    //     await message.channel.send(slams[Math.floor(Math.random() * (37 - 1) + 1)]);
    //   }
    // }
    // if(message.content.includes("!silence")) {
    //   let silenced = message.mentions.users.first().username
    //   if(message.author.username === 'Ayanowyn') {
    //     timedOut.push(silenced);
    //     await message.channel.send(silenced + " has been silenced.")
    //   }
    // }
    // if(message.content.includes("!release")) {
    //   if(message.author.username === 'Ayanowyn') {
    //     timedOut = [];
    //     await message.channel.send("Everyone has been released.")
    //   }
    // }
});
bot.login(token);
