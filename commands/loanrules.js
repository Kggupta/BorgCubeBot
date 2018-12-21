const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{

    let lrulesembed = new Discord.RichEmbed()
    .setTitle("Loan Details")
    .setColor("RED")
    .setTimestamp()
    .setDescription("**HOW TO GET A LOAN:**\nBe trusted by me (The Borg) and have at least one mutual server with you that you have a significant presence in. Your account must be at least 30 days old.\n\n**HOW LOANS WORK:**\n-**15%** interest on loans at first with a max of 50k debt. Debts must be paid by the end of the month or **10%** interest is added. (**BRONZE PLAN**)\n-After 7 days of paying back your first debt in full I decide whether i can trust you or not. **THERE ARE NO EXCEPTIONS SO DONT ASK FOR ONE**.\n-If I deem you trustworthy interest per debt is decreased to **10%** and max is increased to **100k**.(**GOLD PLAN**)\n-Debts now must be paid  at the end of every month with **5%** interest penalty if you fail to do so\n-You can opt for a higher max which will result in a higher interest rate (and vice versa)\n-I don't trade debts between currencies\n-I retain the right to randomly **increase/decrease** your debt or bring the due date **closer/farther**. (You will be notified with a chance to reverse the decision)\n-Loans given on the last week of a month have their monthly fee transferred to the next month so that it is still fair\n-If you win a giveaway in the server that involves the currency you have debt in, your winnings will be **removed from your debt** and you will NOT be giving the winnings directly.\n-Debts >200k have 10% monthly interest regardless of plan/card, same goes for debts >=250k have 15%\n-Check this message regularly as terms and conditions may change (debt holders will be notified)\n\n-There is also the **Black card** tier where you have no max and your interest is 7.5%. Instead of monthly interest it is Bi-monthly at an interest of 5%. All other details are the same as the **Gold Plan**. ``THIS TIER IS INVITE ONLY. ASKING FOR THIS TIER WILL AUTOMATICALLY MAKE YOU BLACKLISTED FROM GETTING IT``")

    message.channel.send(lrulesembed);
}

module.exports.help = {
  name: "loanrules",
  aliases: ["lrules"],
  description: "Get the rules for how Borg-Loans work",
  usage: "bloanrules",
  accessibleby: "Anyone"
}
