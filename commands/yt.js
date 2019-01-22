const Discord = require("discord.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBE_API_KEY);
module.exports.run = async (bot, message, args)=>{
  const searchQuery = args.slice(1).join(' ')
  const url = searchQuery.replace(/<(.+)>/g,'$1')
  console.log(searchQuery)
  try{
    const video = await youtube.getVideo(url)
  }catch(error){
    try{
      var videos = await youtube.searchVideos(url, 1);
      var video = await youtube.getVideoByID(videos[0].id);
    }catch(error){
      return message.channel.send("That video returned nul. Dont think this should happen? Report the bug using `brbug {explantion}`")
    }
  }
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  return message.channel.send(song.url);
}

module.exports.help = {
  name: "youtube",
  aliases: ["yt", "ytsearch", "y"],
  description: "Search YouTube for a video",
  usage: "byoutube {name of vid OR the URL}",
  accessibleby: "Anyone"
}
