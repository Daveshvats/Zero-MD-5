const ttt = require("google-tts-api");
let handler = async (m, { conn,text }) => {
  const pushName = m.pushName || "No Name"
if (!text && m.quoted) {
    message = `${m.quoted ? m.quoted.msg : ""}`;
  } else if (args[0]) {
    message = args.join(" ");
  } else {
    message = `Amay bolar jonno kono text dao ${pushName} senpai !`;
  }

  const texttospeechurl = ttt.getAudioUrl(message, {
    lang: "bn",
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
  handler.help = ['saybengali text']
  handler.tags = ['tools']
  handler.command = ['saybengali']
  
  export default handler