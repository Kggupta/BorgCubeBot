const Discord = require("discord.js");
let coins = require("../coins.json");
const fs = require("fs");
module.exports.run = async (bot, message, args)=>{
  var validinputs = ["heads", "h", "head", "t", "tails", "tail"];
  var validinputsh = ["heads", "h", "head"];
  var validinputst = ["t", "tails", "tail"];
  console.log(args[0], args[1])
  if(!validinputs.includes(args[0])){
    let wrongwayEmbed = new Discord.RichEmbed()
    .setTitle("Incorrect Format")
    .setColor("RED")
    .addField("Proper format", "bcf ``h/t`` ``bet``");

    return message.channel.send(wrongwayEmbed);
  }
  if (isNaN(args[1]) || Number.isInteger(args[1] === false)){
    let wrongwayEmbed = new Discord.RichEmbed()
    .setTitle("Incorrect Format")
    .setColor("RED")
    .addField("Proper format", "bcf ``h/t`` ``bet``");

    return message.channel.send(wrongwayEmbed);
  }
  let bet = parseFloat(args[1]);
  if (bet > coins[message.author.id+message.guild.id].coins){
    let wrongwayEmbed = new Discord.RichEmbed()
    .setTitle("⚠ERROR⚠")
    .setColor("RED")
    .addField("Not enough funds", `You have ${coins[message.author.id+message.guild.id].coins}`);

    return message.channel.send(wrongwayEmbed);
  }
  var sideBet = 0
  if(validinputsh.includes(args[0])){
    sideBet = 2;
  }else{
    sideBet = 1;
  }
  let sideRaw = (Math.random()*2)+1
  console.log(sideRaw)
  let side = Math.floor(sideRaw);
  var sideOverlay = "asd"
  if (side === 1){
    sideOverlay = "tails"
  }else{
    sideOverlay = "heads"
  }
  console.log(sideBet, sideOverlay)
  if(sideBet === side){
      coins[message.author.id+message.guild.id] = {
        debt: coins[message.author.id+message.guild.id].debt,
        coins: coins[message.author.id+message.guild.id].coins + Math.floor(bet)
      };
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
        if (err) console.log(err)
      });

    let winEmbed = new Discord.RichEmbed()
    .setTitle(`You bet on ${args[0]} and the coin landed on: ${sideOverlay}!`)
    .setColor("GREEN")
    .addField(`${Math.floor(bet)} has been added to your credits!`, `You now have ${coins[message.author.id+message.guild.id].coins}`);

    return message.channel.send(winEmbed);
  }else{
    coins[message.author.id+message.guild.id] = {
      debt: coins[message.author.id+message.guild.id].debt,
      coins: coins[message.author.id+message.guild.id].coins - Math.floor(bet)
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
      if (err) console.log(err)
    });
    let lossEmbed = new Discord.RichEmbed()
    .setTitle(`You bet on ${args[0]} and the coin landed on: ${sideOverlay}!`)
    .setColor("RED")
    .addField(`${Math.floor(bet)} has been removed to your credits!`, `You now have ${coins[message.author.id+message.guild.id].coins}`);

    return message.channel.send(lossEmbed);
  }
}

module.exports.help = {
  name: "coinflip",
  aliases: ["cf", "bf", "flip"]
}
