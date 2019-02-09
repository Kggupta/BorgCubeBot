const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");

module.exports.run = async (bot, message, args)=>{
  const voiceChannel = message.member.voiceChannel;
  if(!message.member.voiceChannel) return message.channel.send("You are not in a VC")
  message.member.voiceChannel.leave();
  return;
}

module.exports.help = {
  name: "stop",
  aliases: ["endmusic", "s"],
  description: "Stop the bots music in your active voice channel",
  usage: "bstop",
  accessibleby: "Anyone"
}
