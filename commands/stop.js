const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
var ffmpeg = require('ffmpeg');
module.exports.run = async (bot, message, args)=>{
  const voiceChannel = message.member.voiceChannel;
  if(!message.member.voiceChannel) return message.channel.send("You are not in a VC")
  message.member.voiceChannel.leave();
  return;
}

module.exports.help = {
  name: "stop",
  aliases: ["endmusic", "stp"],
  description: "Stop the bots music in your active voice channel. This command is in beta, and will probably have some bugs, please be patient and I will have a full release of the command soon.",
  usage: "bstop",
  accessibleby: "Anyone"
}
