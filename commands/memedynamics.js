const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let memelawpages = ["**The First Law of Memedynamics**\n\nAny and all private meme accounts which require you to follow/subscribe to them or anything which hinders the ability to share a meme are blasphemous to **The High Meme Society**. They are not true memelords, they are corrupt and a menace. Rise above this unholy nature, never follow a private meme account or partake in such despicable actions.","**The Second Law of Memedynamics**\n\nThe second law of memedynamics states that the quantity of sleep in hours is inversely and exponentially proportional to your memelord level, measured in potatoes. This is to say that any increase in hours of sleep will cause an exponential decrease in your quality of a memelord.\n:eight_pointed_black_star: *HOWEVER*, once the amount of sleep in hours reaches 24 the hours of sleep becomes linearly proportional to your memelord level.\n\n **This can be modeled using these equations:**\n","**The Third Law of Memedynamics**\n\nA meme must contain at least one other aspect that is not directly related to the meme itself, but refers to another meme or a trend of such in order to be considered a true meme, the rest are perhaps half-breeds, impure. **UNLESS** they are part of a meme family, which inceptually refers endlessly to itself and is therefore a true meme. These reference aspects must be undetectable (to some degree) by those outside of the **HMS**, such as boomers and underdeveloped idiots that don't appreciate memes."];
  memelawpage = 1;

  const memeEmbed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setFooter(`Page ${memelawpage} of ${memelawpages.length}`)
  .setDescription(memelawpages[memelawpage-1])

  message.channel.send(memeEmbed).then(msg =>{
    msg.react('⏪').then( r =>{
      msg.react('⏩')

      const filterBack = (reaction,user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const filterForward = (reaction,user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(filterBack, {time: 60000});
      const forwards = msg.createReactionCollector(filterForward, {time: 60000});

      backwards.on('collect', r =>{//When backward emoji is selected
        if(memelawpage === 1) return;
        memelawpage--;
        memeEmbed.setImage("")
        if(memelawpage === 2){
          memeEmbed.setImage("https://cdn.discordapp.com/attachments/564460911780429825/622913720217108480/Screen_Shot_2019-09-15_at_5.53.14_PM.png")
        }
        memeEmbed.setDescription(memelawpages[memelawpage-1]);
        memeEmbed.setFooter(`Page ${memelawpage} of ${memelawpages.length}`)
        msg.edit(memeEmbed)
      })

      forwards.on('collect', r=>{//When forward emoji is selected
        if(memeEmbed === memelawpages.length) return;
        memelawpage++;
        memeEmbed.setImage("")
        if(memelawpage === 2){
          memeEmbed.setImage("https://cdn.discordapp.com/attachments/564460911780429825/622913720217108480/Screen_Shot_2019-09-15_at_5.53.14_PM.png")
        }
        memeEmbed.setDescription(memelawpages[memelawpage-1]);
        memeEmbed.setFooter(`Page ${memelawpage} of ${memelawpages.length}`)
        msg.edit(memeEmbed)
      })//Forwards event handler
    })//Reaction handler
  })//(msg) handler
}

module.exports.help = {
  name: "memedynamics",
  aliases: ["memedyn"],
  description: "Study the three essential laws of memedynamics.",
  usage: "bmemedynamics",
  accessibleby: "MemeLords"
}
