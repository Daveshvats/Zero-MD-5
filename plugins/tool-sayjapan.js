const ttt = require("google-tts-api");
let handler = async (m, { conn,text }) => {
if (!text && m.quoted) {
    message = `${m.quoted ? m.quoted.msg : ""}`;
  } else if (args[0]) {
    message = args.join(" ");
  } else {
    message = `Please provide me a text to say ${pushName} senpai !`;
  }

  const texttospeechurl = ttt.getAudioUrl(message, {
    lang: "ja",
    slow: false,
    host: "https://translate.google.com",
  });

  conn.sendMessage(
    m.chat,
    { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
    { quoted: m }
  ).catch((e) => {
    m.reply(`An error Occurd !`);
  });}
  handler.help = ['sayjapan text']
  handler.tags = ['tools']
  handler.command = ['sayjapan']
  
  export default handler