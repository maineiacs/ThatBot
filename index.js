const Discord = require("discord.js")
const bot = new Discord.Client();
const fs = require("fs");
require('dotenv').config();
const os = require("os");
const hostname = os.hostname();

bot.commands = new Discord.Collection();

if(process.env.DISCORD_TOKEN === "") return console.log("Set your token up! Go to https://www.discordapp.com/developers and generate a token from a bot user.");

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");

  if (jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", () => {
  console.log(bot.user.username + " is online.")

  bot.channels.get('693868283325055026').send(
      `iya. I\'ve been restarted. 
      I\'m using the prefix ${process.env.BOT_PREFIX}
      and running on ${hostname}`
  );
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = process.env.BOT_PREFIX;
  let commandName = command.slice(prefix.length);

  if (commandName === 'calc') {
    let stringMath = require('string-math');
    let equation = message.content.slice(5);
    let answer = '';

    try {
      answer = stringMath(equation)
    } catch(e) {
      answer = e.message
    }

    bot.channels.get('693868283325055026').send(answer);
  }

  let commandfile = bot.commands.get(commandName);
  if (commandfile) commandfile.run(bot,message,args);
})


bot.login(process.env.DISCORD_TOKEN);
