const Discord = require("discord.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBE_API_KEY);
module.exports.run = async (bot, message, args)=>{
  const searchQuery = args.join(' ')
  const url = searchQuery.replace(/<(.+)>/g,'$1')
  console.log(searchQuery)
  try{
    const video = await youtube.getVideo(url)
  }catch(error){
    try{
      var videos = await youtube.searchVideos(url, 1);
      var video = await youtube.getVideoByID(videos[0].id);
    }catch(error){
      return message.channel.send("That video returned nul.")
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
  aliases: ["yt", "ytsearch"],
  description: "Search YouTube for a video",
  usage: "byoutube {title/URL}",
  accessibleby: "Anyone"
}
