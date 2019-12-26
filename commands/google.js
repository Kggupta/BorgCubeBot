const Discord = require("discord.js");
const google = require("google");

module.exports.run = async (bot, message, args)=>{
  google.resultsPerPage = 25
  let description = "";
  try{
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

        message.channel.send(googleEmbed);
    })
  }catch(e){
    message.channel.send("Google is blocking discord API's from interacting with it. I'm currently looking for a solution, sorry for the inconvenience!")
  }
}

module.exports.help = {
  name: "google",
  aliases: ["goo"],
  description: "Search Google! - BETA",
  usage: "bgoogle {search}",
  accessibleby: "Anyone"
}
