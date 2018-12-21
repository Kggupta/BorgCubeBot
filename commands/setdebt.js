const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args)=>{
    if (message.author.id != 444998388795179042){
      let debtEmbed = new Discord.RichEmbed()
      .setAuthor("INTRUDER ALERT")
      .setColor("RED")
      .addField("You are not of The Borg collective");

      message.channel.send(debtEmbed).then(msg =>{msg.delete(5000)});
      return;
    }
    let pUser = message.guild.member(message.mentions.users.first());
    if (isNaN(args[1])){
      let wrongwayEmbed = new Discord.RichEmbed()
      .setTitle("Incorrect Format")
      .setColor("RED")
      .addField("Proper format", "badddebt ``user`` ``amount``");

      return message.channel.send(wrongwayEmbed);
    }
    if(!coins[pUser.id+message.guild.id]){
      coins[pUser.id+message.guild.id] = {
        debt: 0,
        coins: 0
      };
    }
    coins[pUser.id+message.guild.id] = {
      debt: parseInt(args[1]),
      coins: coins[pUser.id+message.guild.id].coins

    };
    let transferEmbed = new Discord.RichEmbed()
    .setTitle("Debt has been updated")
    .setColor("GREEN")
    .addField("Debt enforcer", message.author)
    .addField("Debt holder", pUser)
    .addField("Amount", args[1]);

    message.channel.send(transferEmbed);

  }



module.exports.help = {
  name: "setdebt",
  aliases: ["setloan","sd"],
  description: "Sets the debt of a user (refer to bdebt)",
  usage: "bsetdebt {user} {amount}",
  accessibleby: "The Borg"
}
