const Discord = require("discord.js");
const superagent = require("superagent")

module.exports.run = async (bot, message, args)=>{
  let {body} = await superagent
  .get(`https://random.dog/woof.json`)

  let randomDogEmbed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTitle("Another dog another day")
  .setImage(body.url);

  return message.channel.send(randomDogEmbed);

}

module.exports.help = {
  name: "randomdog",
  aliases: ["randdog"],
  description: "Get a random image/GIF of a doggo doing doggo stuff.",
  usage: "brandomdog",
  accessibleby: "Anyone"
}
