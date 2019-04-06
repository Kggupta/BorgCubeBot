const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
    let speciespages = ["**Human**\nSkills:\n- Befriend other species faster\n- Increase to passive income from colonized planets.\n\nWeaknesses:\n- Low resistance to cloaked ships\n- Romulan species have increased hostility toward humans\n- Ships cannot pass warp factor 9 without taking hull damage.", "**Vulcan**\nSkills:\n- High cognitive capability\n- Vulcans easily befriend and connect with other species.\n- Telepathy\n\nWeaknesses:\n- Difficulty controlling powerfull emotions\n- Vulcan ships lack offensive capability.", "**Klingon**\nSkills:\n- Extremly high physical strength\n- Prioritize honor\n- Klingon ships have high offensive power\n\nWeaknesses:\n- Violent tendencies\n- Species that are uneducated in Klingon culture find them difficult to befriend.", "**Ferengi**\nSkills:\n- Cunning\n- Always find a way to make a profit\n- Ferengi ships are difficult to detect.\n\nWeaknesses:\n- Hard to befriend other species\n- No honor"];
    speciespage = 1;

    const classlistEmbed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setFooter(`Species ${speciespage} of ${speciespages.length}`)
    .setDescription(speciespages[speciespage-1])
    .setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564121233378115610/Screen_Shot_2019-04-06_at_12.16.07_PM.png")

    message.channel.send(classlistEmbed).then(msg =>{
      msg.react('⏪').then( r =>{
        msg.react('⏩')

        const filterBack = (reaction,user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
        const filterForward = (reaction,user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(filterBack, {time: 60000});
        const forwards = msg.createReactionCollector(filterForward, {time: 60000});

        backwards.on('collect', r =>{//When backward emoji is selected
          if(speciespage === 1) return;
          speciespage--;
          classlistEmbed.setDescription(speciespages[speciespage-1]);
          classlistEmbed.setFooter(`Species ${speciespage} of ${speciespages.length}`)
          if(speciespage === 1) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564121233378115610/Screen_Shot_2019-04-06_at_12.16.07_PM.png");
          if(speciespage === 2) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564122102471458856/Screen_Shot_2019-04-06_at_12.19.26_PM.png");
          if(speciespage === 3) classlistEmbed.setThumbnail("https://media.discordapp.net/attachments/522985989426118656/564122785526448141/Screen_Shot_2019-04-06_at_12.22.18_PM.png");
          if(speciespage === 4) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564123170941173811/Screen_Shot_2019-04-06_at_12.23.53_PM.png");
          msg.edit(classlistEmbed)
        })

        forwards.on('collect', r=>{//When forward emoji is selected
          if(speciespage === speciespages.length) return;
          speciespage++;
          classlistEmbed.setDescription(speciespages[speciespage-1]);
          classlistEmbed.setFooter(`Species ${speciespage} of ${speciespages.length}`)
          if(speciespage === 1) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564121233378115610/Screen_Shot_2019-04-06_at_12.16.07_PM.png");
          if(speciespage === 2) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564122102471458856/Screen_Shot_2019-04-06_at_12.19.26_PM.png");
          if(speciespage === 3) classlistEmbed.setThumbnail("https://media.discordapp.net/attachments/522985989426118656/564122785526448141/Screen_Shot_2019-04-06_at_12.22.18_PM.png");
          if(speciespage === 4) classlistEmbed.setThumbnail("https://cdn.discordapp.com/attachments/522985989426118656/564123170941173811/Screen_Shot_2019-04-06_at_12.23.53_PM.png");
          msg.edit(classlistEmbed)
        })//Forwards event handler
      })//Reaction handler
    })//(msg) handler
}

module.exports.help = {
  name: "species",
  aliases: ["class"],
  description: "See the list of species you can become. Check `pickspecies` for info on how to set your class.\nPlease note that since the RPG functionality is new, databases will be unstable and saves might get lost. If they do feel free to DM me (The Borg) and I will fix it for you.",
  usage: "bspecies",
  accessibleby: "Anyone"
}
