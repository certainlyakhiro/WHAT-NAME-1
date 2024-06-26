import axios from "axios";

export const metadata = {
  name: "roast",
  author: "Vex | AkhiroDEV",
  hasPrefix: false,
  description: "Wanna roast someone on messenger?",
  usage: "{p}roast [mention]"
};

export async function onRun({ box, event }) {
  try {
    const mention = Object.keys(event.mentions);
    if (mention.length !== 1 || !event.mentions[mention[0]]) {
      box.react("ℹ️");
      return box.send(`ℹ️ | Please mention someone to roast.`);
    }
    const mentionName = event.mentions[mention[0]].replace("@", "");

    const response = await axios.get(`https://evilinsult.com/generate_insult.php?lang=en&type=json`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch insult from API");
    }
    const roast = response.data.insult;

    box.send(`Hello there @${mentionName}, I just want to say to you that ${roast}`);
  } catch (error) {
    console.log(error);
    const mentionName = Object.keys(event.mentions).length === 1 ? event.mentions[Object.keys(event.mentions)[0]].replace("@", "") : "someone";
    box.send(`Hmph, you're safe @${mentionName}\n\nERROR: ${error.message}`);
  }
}