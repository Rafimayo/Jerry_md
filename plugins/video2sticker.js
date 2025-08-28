
const config = require('../config');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson

cmd({
  pattern: "sticker",
  fromMe: true,
  desc: "Convert video to sticker",
  type: "converter",
}, async (message, match) => {
  if (!message.reply_message.video) return await message.sendMessage("Reply to a video!");
  
  const video = await message.reply_message.download();
  const sticker = await ffmpeg(video)
    .inputFormat("mp4")
    .outputFormat("webp")
    .outputOptions([
      "-vcodec",
      "libwebp",
      "-vf",
      "scale=512:512:force_original_aspect_ratio=decrease,fps=15",
    ])
    .save("sticker.webp");
  
  await message.sendMessage(sticker, { mimetype: "sticker/webp" });
});
