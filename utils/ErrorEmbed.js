const Discord = require("discord.js");

class ErrorEmbed {
  constructor(title, description) {
    this.title = title;
    this.description = description;

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`❌ ${this.title} ❌`)
      .setDescription(this.description);

    return embed;
  }
}

module.exports = ErrorEmbed;
