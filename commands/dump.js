const fs = require("fs");
const Discord = require("discord.js");

const throwGeneric = require("../utils/throwGeneric");
const WarningEmbed = require("../utils/WarningEmbed");
const ErrorEmbed = require("../utils/ErrorEmbed");

module.exports = {
  name: "dump",
  alt: "du",
  handler: (message) => {
    try {

      if (message.author.id !== "453146976008011777") return;

      let filter = (m) => m.author.id === message.author.id;
      message.channel
        .send(
          new WarningEmbed(
            "Are you sure ?",
            "Send **Y** or **N** depending on if you wanna clear the cache."
          )
        )
        .then(() => {
          message.channel
            .awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ["time"],
            })
            .then((message) => {
              message = message.first();
              if (message.content.toUpperCase() == "Y") {
                fs.writeFileSync("./temp/cache.json", "[]", "utf-8");
                message.channel.send(
                  new Discord.MessageEmbed({
                    title: "Cache Cleared",
                    description: "Saved cache has been cleared successfully.",
                  })
                );
              } else if (message.content.toUpperCase() == "N") {
                message.channel.send(
                  new WarningEmbed(
                    "Dump Cancelled",
                    "The delete cache dump was cancelled."
                  )
                );
              } else {
                message.channel.send(
                  new ErrorEmbed(
                    "Invalid Response",
                    "Your response can either be **Y** or **N**"
                  )
                );
              }
            })
            .catch(() => {
              message.channel.send(
                new ErrorEmbed(
                  "Timeout",
                  "Process cancelled due to not recieveing a reply in time."
                )
              );
            });
        });

    } catch (error) {
      console.error(error);
      throwGeneric(message);
      return;
    }
  },
};
