const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let loanplanpages = ["**HOW TO GET A LOAN**\n- Be trusted by me (The Borg)\n- I must have at least one mutual server with you that you have a significant presence in (ie. Owner/Admin).\n- Your account must be at least 30 days old.\n- Generally speaking, registering a new investee is up to the discrection of the investor. Decisions are final and non-negotiable\n- Check this message regularly as terms and conditions may change (debt holders will be notified)", "**BRONZE PLAN**\n`Initial interest:` 15% of amount loaned\n`Max debt:` 50k (Conversion factor may vary).\n`Monthly interest:` 20% (Compounded)\n`Waiting period:` 7 days\n\n**NOTES**\n- If you win a giveaway (hosted by me) that involves the currency you have debt in, your winnings will be removed from your debt\n- Loans given on the last week of a month have their monthly fee transferred to the next month so that it is still fair\n- I don't trade debts between currencies\n- Everyone starts with this tier\n- Waiting the 7 day period does not guarentee being moved up to the Gold level\n- As with all plans, Debt and due dates can be increased/decreased or brought further/closer at the investors discrection. *Investees will be notified with a chance to reverse the decision*", "**GOLD PLAN**\n`Initial interest:` 10% of amount loaned\n`Max debt:` 100k (Conversion factor may vary).\n`Monthly interest:` 5% (Compounded)\n`Waiting period:` Varies\n\n**NOTES**\n- If you win a giveaway (hosted by me) that involves the currency you have debt in, your winnings will be removed from your debt\n- Loans given on the last week of a month have their monthly fee transferred to the next month so that it is still fair\n- I don't trade debts between currencies\n- Debts >=200k(After conversion) have 10% monthly interest\n- Debts >=250k(After conversion) have 15% monthly interest\n- You can opt for a higher max which will result in a higher interest rate (Both initial and monthly depending on situation) & vice versa\n- As with all plans, Debt and due dates can be increased/decreased or brought further/closer at the investors discrection. *Investees will be notified with a chance to reverse the decision*", "**BLACK CARD**\n`Initial interest:` 7.5% of amount loaned\n`Max debt:` 500k\n`Monthly interest:` 5% (Compounded)\n`Waiting period:` N/A\n\n**NOTES**\n- This tier is invite only\n- ASKING FOR THIS TIER WILL AUTOMATICALLY MAKE YOU BLACKLISTED FROM GETTING IT\n- If you win a giveaway (hosted by me) that involves the currency you have debt in, your winnings will be removed from your debt\n- Loans given on the last week of a month have their monthly fee transferred to the next month so that it is still fair\n- I don't trade debts between currencies\n- Debts >=200k(After conversion) have 6% monthly interest\n- Debts >=250k(After conversion) have 10% monthly interest\n- You can opt for a higher max which will result in a higher interest rate (Both initial and monthly depending on situation) & vice versa\n- As with all plans, Debt and due dates can be increased/decreased or brought further/closer at the investors discrection. *Investees will be notified with a chance to reverse the decision*"];
  loanpage = 1;

  const loansEmbed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setFooter(`Page ${loanpage} of ${loanplanpages.length}`)
  .setDescription(loanplanpages[loanpage-1])

  message.channel.send(loansEmbed).then(msg =>{
    msg.react('⏪').then( r =>{
      msg.react('⏩')

      const filterBack = (reaction,user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const filterForward = (reaction,user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(filterBack, {time: 60000});
      const forwards = msg.createReactionCollector(filterForward, {time: 60000});

      backwards.on('collect', r =>{//When backward emoji is selected
        if(loanpage === 1) return;
        loanpage--;
        loansEmbed.setDescription(loanplanpages[loanpage-1]);
        loansEmbed.setFooter(`Page ${loanpage} of ${loanplanpages.length}`)
        msg.edit(loansEmbed)
      })

      forwards.on('collect', r=>{//When forward emoji is selected
        if(loanpage === loanplanpages.length) return;
        loanpage++;
        loansEmbed.setDescription(loanplanpages[loanpage-1]);
        loansEmbed.setFooter(`Page ${loanpage} of ${loanplanpages.length}`)
        msg.edit(loansEmbed)
      })//Forwards event handler
    })//Reaction handler
  })//(msg) handler
}

module.exports.help = {
  name: "loanrules",
  aliases: ["lrules"],
  description: "Get the rules for how Borg-Loans work. These rules only apply to loans given by The Borg",
  usage: "bloanrules",
  accessibleby: "Anyone"
}
