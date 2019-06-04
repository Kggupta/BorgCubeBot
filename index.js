const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 1;
let prefix = botconfig.prefix;

fs.readdir("./commands/", (err, files)=>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f,i)=>{
    let props = require(`./commands/${f}`);
    console.log(`${f}loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias=>{
      bot.aliases.set(alias, props.help.name)
    });
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} has reached light speed`)
  bot.user.setActivity("bhelp")
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith("b")) return;
    if(cooldown.has(message.author.id) && message.author.id != "444998388795179042"){
      return;
    }
    cooldown.add(message.author.id);
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile){
      console.log(`Passed`)
      commandfile.run(bot,message,args)
    }
    setTimeout(() =>{
      cooldown.delete(message.author.id)
    }, cdseconds * 1000)
});

bot.login(process.env.BOT_TOKEN);
