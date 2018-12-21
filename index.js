const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json")
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
let coins = require("./coins.json");
let cooldown = new Set();
let cdseconds = 1;


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
    if(!coins[message.author.id+message.guild.id]){
      coins[message.author.id+message.guild.id] = {
        debt: 0,
        coins: 0
      };
    }
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
      if (err) console.log(err)
    });
    if (message.channel.type === "dm") return;
    let coinAmt = Math.floor(Math.random()*40)+1;
    let baseAmt = Math.floor(Math.random()*10)+1;
    if(coinAmt === baseAmt){
      coins[message.author.id+message.guild.id] = {
        coins: coins[message.author.id+message.guild.id].coins + coinAmt,
        debt: coins[message.author.id+message.guild.id].debt
      };
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
        if (err) console.log(err)
      });
    }
    let prefix = botconfig.prefix;
    if (!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
      message.delete();
      message.reply(`You must wait ${cdseconds} seconds between sending commands`)
      return;
    }
    cooldown.add(message.author.id);
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
    setTimeout(() =>{
      cooldown.delete(message.author.id)
    }, cdseconds * 1000)
});

bot.login(tokenfile.token);
