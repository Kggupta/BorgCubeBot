const Discord = require("discord.js");
let coins = require("../coins.json");
module.exports.run = async (bot, message, args)=>{
  if(!coins[message.author.id+message.guild.id]){
    coins[message.author.id+message.guild.id] = {
      debt: 0,
      coins: 0
    };
  }

  let uCoins = coins[message.author.id+message.guild.id].coins;

  message.channel.send({embed:{
              title: "Federation Credits",
              color: 0x008b00,
              fields: [{
                  name: "Member",
                  value: message.author.username,
                  inline: true
              },
              {
                  name: "Balance",
                  value: uCoins,
                  inline: true
              }]
          }})
}

module.exports.help = {
  name: "credits",
  aliases: ["coins", "balance", "bal", "coin","$"],
  description: "Check your credit balance",
  usage: "bcredits",
  accessibleby: "Anyone"
}
