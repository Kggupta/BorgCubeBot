const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args)=>{
  console.log(args[1])
  if(!coins[message.author.id+message.guild.id]){
    let limitedFundEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RED")
    .addField("⚠You do not have enough funds!⚠")

    return message.channel.send(limitedFundEmbed).then(msg =>{msg.delete(5000)});
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (isNaN(args[1])){
    let wrongwayEmbed = new Discord.RichEmbed()
    .setTitle("Incorrect Format")
    .setColor("RED")
    .addField("Proper format", "bsend ``user`` ``amount``");

    return message.channel.send(wrongwayEmbed);
  }
  if (message.author.id === pUser.id){
    let selfEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RED")
    .addField("⚠ERROR⚠", "You can't send money to yourself!")

    return message.channel.send(selfEmbed).then(msg =>{msg.delete(5000)});
  }
  if(!coins[pUser.id+message.guild.id]){
    coins[pUser.id+message.guild.id] = {
      debt: 0,
      coins: 0
    };
  }

  let pCoins = coins[pUser.id+message.guild.id].coins;
  let sCoins = coins[message.author.id+message.guild.id].coins;

  if(sCoins < args[1]){
    let limitedFundEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RED")
    .addField("⚠ERROR⚠", "You dont have enough credits!")

    return message.channel.send(limitedFundEmbed).then(msg =>{msg.delete(5000)});

  }

  coins[message.author.id+message.guild.id] = {
    coins: sCoins - parseInt(args[1]),
    debt: coins[message.author.id+message.guild.id].debt
  };

  coins[pUser.id+message.guild.id] = {
    coins: pCoins + parseInt(args[1]),
    debt: coins[pUser.id+message.guild.id].debt
  };
  let fundedEmbed = new Discord.RichEmbed()
  .setTitle("Transaction Complete")
  .setColor("GREEN")
  .addField("Sender", message.author)
  .addField("Recipient", pUser)
  .addField("Amount", args[1]);

  message.channel.send(fundedEmbed);



}

module.exports.help = {
  name: "send",
  aliases: ["transfer", "give"],
  description: "Transfer money to a user",
  usage: "bsend <member> [amount]",
  accessibleby: "Anyone"
}
