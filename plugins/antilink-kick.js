const { cmd } = require('../command');
const config = require("../config");  

cmd({ 'on': "body" }, async (conn, m, store, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const linkPatterns = [
      /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i, // WhatsApp group links
        /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
    ];

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTI_LINK_REMOVE === 'true') {
      
      // ⚠️ گروپ میں warning
      await reply(`⚠️ Link detected!\n@${sender.split("@")[0]}, links are not allowed in this group.`, { mentions: [sender] });

      // ❌ میسج delete
      await conn.sendMessage(from, { delete: {
        remoteJid: from,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
      }});

      // 📩 پرائیویٹ DM warning
      await conn.sendMessage(sender, { text: `⚠️ آپ نے گروپ (${from}) میں link بھیجا تھا جو allow نہیں ہے، اس لیے delete کر دیا گیا۔` });
    }

  } catch (e) {
    console.log("Anti-link error: ", e);
  }
});
