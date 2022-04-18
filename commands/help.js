require("dotenv").config();
const prefix = process.env.PREFIX;
const Discord = require("discord.js");

const throwGeneric = require("../utils/throwGeneric");

module.exports = {
  name: "help",
  alt: "h",
  handler: (message) => {
    try {
      
      const embed = new Discord.MessageEmbed({
        color: "GREEN",
        title: "Mrksman Help",
        description:
          "> A discord bot that keeps track of the latest deleted/edited message in a server. It's been written hastily and shit is guaranteed to break so in the case that it does please tag me.",
        fields: [
          { name: `${prefix}help (h)`, value: "```Shows this menu.```" },
          {
            name: `${prefix}delete (d)`,
            value:
              "```Shows the latest deleted message along with the time it was originally sent and the author. (In the case that the image was a group of attachments, it sends the first one)```",
          },
          {
            name: `${prefix}edit (e)`,
            value:
              "```Shows the latest edited message. It sends the old message and the new one along with who sent it.```",
          },
        ],
        footer: { text: "Mrksman v0.2 @tahlil" },
      });

      message.channel.send(embed);

    } catch (error) {
      console.error(error);
      throwGeneric(message);
      return;
    }
  },
};
