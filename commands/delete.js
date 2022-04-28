const Discord = require("discord.js");
const fs = require("fs");
const { DateTime } = require("luxon");

const throwGeneric = require("../utils/throwGeneric");

module.exports = {
  name: "delete",
  alt: "d",
  handler: async (message) => {
    try {

      const data = JSON.parse(fs.readFileSync("./temp/delete.json", "utf-8"));
      data.channel = message.guild.channels.cache.get(data.channelID);

      const embed = new Discord.MessageEmbed({
        color: "RED",
        title: "The Latest Deleted Message",
        description: "> *DISCLAIMER:* This shit broken as hell.",
        fields: [
          { name: "Message Sender:", value: `<@${data.authorID}>` },
          { name: "Channel Name:", value: `\`${data.channel.name}\`` },
          {
            name: "Message Sent At:",
            value: `\`${DateTime.fromMillis(data.createdTimestamp)
              .setZone("UTC+6")
              .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
          },
          {
            name: "Message:",
            value: `${!data.content ? "No Content" : data.content}`,
          },
        ],
      });

      if (data.attachments.length) {
        const files = fs.readdirSync("./temp/attachments");
        await message.channel.send(embed);
        files.forEach(async (item) => {
          await message.channel.send("", {
            files: [`./temp/attachments/${item}`],
          });
        });
      } else {
        message.channel.send(embed);
      }
      
    } catch (error) {
      console.error(error);
      throwGeneric(message);
      return;
    }
  },
};
