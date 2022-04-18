// This function throws a generic error, it accepts a message object.
const ErrorEmbed = require("./ErrorEmbed");

const genericError = (message) => {
  const someRandomErr = new ErrorEmbed(
    "Something Went Wrong",
    "Something went horribly wrong, ping dev so that he/she can check the logs and find out what it is."
  );
  message.channel.send(someRandomErr);
};

module.exports = genericError;
