const fetch = require("node-fetch")
const { Client, MessageEmbed, Message} = require("discord.js")
const color = require("../../config.json").color;
const moment = require("moment");

module.exports = {
    name: 'samp',
    aliases: ["samps"],
    description: 'Get info Samp',
    
    run: async (client, message, args) => {

      try {
      
      if (!args[0]) return message.channel.send(`**${client.emoji.fail} • Please Give Me **\`Ip\`**:**\`Port\`**!**`);
      

      const split = args.join(" ").split(":");
const ip = split[0];
const port = split[1];

       const json = await fetch(`http://anabelle.bot.nu/api/sampquery?ip=${ip}&port=${port}`).then(r => r.json())
        if (json.response === "Something Went Wrong Please Check ip And port correcly or Please Try Again Later") return message.channel.send(`**${client.emoji.fail} • IP Not Found!**`)

      if (json.response.isPlayersIngame > 10) return;
      
      var pw = {
            "true": "Enable",
            "false": "Disable"
        };
      const error = client.channels.cache.get("900384576348762122");

      const logs = client.channels.cache.get("909639893796413500")
        
        const embed = new MessageEmbed()
            .setTitle(`${client.emoji.info} • ${json.response.hostname}`)
          .setThumbnail("https://media.discordapp.net/attachments/899281914500878346/900969660873334805/samp-logo-png-6.png")
          .addField("Gamemode", `\`\`\`${json.response.gamemode}\`\`\``)
          .addField("Language", `\`\`\`${json.response.language}\`\`\``)
          .addField("Players Info", `\`\`\`${json.response.maxplayers}/${json.response.isPlayerOnline}\`\`\``)
          .addField("Map Name", `\`\`\`${json.response.rule.mapname}\`\`\``)
          .addField("Version", `\`\`\`${json.response.rule.version}\`\`\``)
       .addField("Website", `\`\`\`${json.response.rule.weburl}\`\`\``)
.setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .setTimestamp()
            .setColor(color);
        message.channel.send({embeds: [embed]})

      logs.send({ embeds: [embed], content: `\`${message.guild.name}\` • \`${message.channel.name}\``})

        } catch (err) {
      const errorEmbed = new MessageEmbed()
      .setTitle("ERROR")
      .setDescription(`${client.emoji.fail} **• ${err.message}**`)
      .setColor("RED")
      .setFooter("message will be deleted after 1 minutes");
      message.channel.send({embeds: [errorEmbed] }).then(e => {
        setTimeout(() => e.delete(), 60000);
      error.send({embeds: [errorEmbed]})
      });
      
      }
      
    }
}