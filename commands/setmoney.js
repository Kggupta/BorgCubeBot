const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args)=>{
  if (message.author.id != 444998388795179042){
    let intruderEmbed = new Discord.RichEmbed()
    .setAuthor("INTRUDER ALERT")
    .setColor("RED")
    .addField("You are not of The Borg collective", "Begone simple human!");

    message.channel.send(intruderEmbed).then(msg =>{msg.delete(5000)});
    return;
  }
  let pUser = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1])){
    let wrongwayEmbed = new Discord.RichEmbed()
    .setTitle("Incorrect Format")
    .setColor("RED")
    .addField("Proper format", "baddcredit ``user`` ``amount``");

    return message.channel.send(wrongwayEmbed);
  }
  if(!coins[pUser.id+message.guild.id]){
    coins[pUser.id+message.guild.id] = {
      debt: 0,
      coins: 0
    };
  }
  coins[pUser.id+message.guild.id] = {
    debt: coins[pUser.id+message.guild.id].debt,
    coins: coins[pUser.id+message.guild.id].coins + parseInt(args[1])

  };
  let transferEmbed = new Discord.RichEmbed()
  .setTitle("Money has been updated")
  .setColor("GREEN")
  .addField("Credits administrativly added by", message.author)
  .addField("Credits reveived by", pUser)
  .addField("Amount", args[1]);

  message.channel.send(transferEmbed);
}

module.exports.help = {
  name: "addcredit",
  aliases: ["ac", "addcredits", "addmoney"]
}
