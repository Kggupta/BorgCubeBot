const Discord = require("discord.js");
let coins = require("../coins.json");
module.exports.run = async (bot, message, args)=>{
  if(!coins[message.author.id+message.guild.id]){
    coins[message.author.id+message.guild.id] = {
      debt: 0,
      coins: 0
    };
  }

  let uDebt = coins[message.author.id+message.guild.id].debt;

  message.channel.send({embed:{
              title: "Debt",
              color: 0x008b00,
              fields: [{
                  name: "Member",
                  value: message.author.username,
                  inline: true
              },
              {
                  name: "Debt",
                  value: uDebt,
                  inline: true
              }]
          }})

}

module.exports.help = {
  name: "debt",
  aliases: ["checkdebt", "debtbal", "db"]
}
