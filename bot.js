const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const logger = require('winston');
const { token } = require('./config.json');
const { usualSuspects, userMap, slams } = require('./data.js');

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
    await interaction.reply(userMap.get(interaction.member.user.username) + ` thinks ${randomRolledUser === 
      userMap.get(interaction.member.user.username) ? 
      randomRolledUser !== "Virginia" ? "he's" : "she's" : randomRolledUser + " is" } a ${slams[Math.floor(Math.random() * (37 - 1) + 1)]}`);
  }
});
bot.login(token);
