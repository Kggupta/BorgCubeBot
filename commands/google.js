const Discord = require("discord.js");
const google = require("google");

module.exports.run = async (bot, message, args)=>{
  google.resultsPerPage = 25
  let description = "";
  google(args.join(" "), function (err, res){
    if (err) console.error(err)
      var link = res.links[1];
      if(!link.description){
        description = "None given"
      }else{
        description = link.description
      }

      let googleEmbed = new Discord.RichEmbed()
      .setTitle(link.title)
      .setColor("GREEN")
      .addField(`Description`, description)
      .addField(`Link`, link.href)

      return message.channel.send(googleEmbed);
  })
}

module.exports.help = {
  name: "google",
  aliases: ["goo"],
  description: "Search Google! - BETA",
  usage: "bgoogle {search}",
  accessibleby: "Anyone"
}
