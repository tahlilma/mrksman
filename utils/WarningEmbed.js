const Discord = require("discord.js");

class WarningEmbed {
  constructor(title, description) {
    this.title = title;
    this.description = description;

    const embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle(`⚠ ${this.title} ⚠`)
      .setDescription(this.description);

    return embed;
  }
}

module.exports = WarningEmbed;
