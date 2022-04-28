require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { DateTime } = require("luxon");

const throwGeneric = require("../utils/throwGeneric");
const ErrorEmbed = require("../utils/ErrorEmbed");

module.exports = {
  name: "cache",
  alt: "c",
  handler: (message) => {
    try {

      const cache = JSON.parse(fs.readFileSync("./temp/cache.json", "utf-8"));

      const arg = message.content.split(" ")[1];
      if (arg) {
        if (parseInt(arg) < 5 && parseInt(arg) >= 0) {

          if (!cache[arg]) {
            message.channel.send(
              new ErrorEmbed(
                "Nothing Cached In That Index",
                "We dont have a cached message in the index that you inputted."
              )
            );
            return;
          }

          const query = cache[arg];
          query.channel = message.guild.channels.cache.get(query.channelID);
          const queryEmbed = new Discord.MessageEmbed({
            color: "#FFC0CB",
            title: `Cached Message (${arg})`,
            description: "> *DISCLAIMER:* This shit broken as hell.",
            fields: [
              { name: "Message Sender:", value: `<@${query.authorID}>` },
              { name: "Channel Name:", value: `\`${query.channel.name}\`` },
              {
                name: "Message Sent At:",
                value: `\`${DateTime.fromMillis(query.createdTimestamp)
                  .setZone("UTC+6")
                  .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
              },
              {
                name: "Message:",
                value: `${!query.content ? "No Content" : query.content}`,
              },
            ],
          });

          message.channel.send(queryEmbed);

        } else {
          message.channel.send(
            new ErrorEmbed("Invalid Argument", "Argument must be between 0-4.")
          );
        }
        return;
      }

      const values = cache.map((item, index) => {
        return {
          name: `Index: ${index}`,
          value: `${!item.content ? "No Content" : item.content}`,
        };
      });

      const listEmbed = new Discord.MessageEmbed({
        color: "#FFC0CB",
        title: "Cache",
        description: `> These are the last 5 cached deleted messages. You can view more info about a message by using \`${process.env.PREFIX}cache <index>\`. Example: \`${process.env.PREFIX}cache 2\` will return the information regarding the second cached message.`,
        fields: values,
      });

      message.channel.send(listEmbed);

    } catch (error) {
      console.error(error);
      throwGeneric(message);
      return;
    }
  },
};
