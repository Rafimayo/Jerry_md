const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

const errorMsgs = {
  onlyGroup: "❌ یہ کمانڈ صرف گروپ میں استعمال کی جا سکتی ہے۔",
  notAdmin: "❌ یہ کمانڈ صرف ایڈمنز کے لیے ہے۔",
  botNotAdmin: "❌ براہ کرم مجھے ایڈمن بنائیں تاکہ میں یہ کمانڈ استعمال کر سکوں۔",
  noUser: "❗ براہ کرم کسی یوزر کو mention یا reply کریں۔",
};

cmd({
  pattern: "promote",
  desc: "کسی ممبر کو ایڈمن بنائیں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, participants, mentionByTag, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);

  let user = mentionByTag[0] || m.quoted?.sender;
  if (!user) return reply(errorMsgs.noUser);

  await conn.groupParticipantsUpdate(from, [user], "promote");
  reply(`✅ @${user.split('@')[0]} اب ایڈمن بن چکا ہے۔`);
});

cmd({
  pattern: "demote",
  desc: "ایڈمن کو ممبر بنائیں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, participants, mentionByTag, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);

  let user = mentionByTag[0] || m.quoted?.sender;
  if (!user) return reply(errorMsgs.noUser);

  await conn.groupParticipantsUpdate(from, [user], "demote");
  reply(`✅ @${user.split('@')[0]} اب عام ممبر ہے۔`);
});

cmd({
  pattern: ".tag",
  desc: "تمام ممبرز کو ٹیگ کریں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, participants, q, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);

  const message = q || "🔔 سب ممبرز ٹیگ کیے جا رہے ہیں:";
  const mentions = participants.map(p => p.id);
  await conn.sendMessage(from, {
    text: `${message}\n\n${mentions.map(u => `@${u.split("@")[0]}`).join("\n")}`,
    mentions
  }, { quoted: mek });
});

cmd({
  pattern: ".mute",
  desc: "گروپ کو بند کریں (صرف ایڈمنز لکھ سکیں)",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, pushname, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);

  await conn.groupSettingUpdate(from, "announcement");
  reply(`🔇 گروپ بند کر دیا گیا از طرف ${pushname}`);
});

cmd({
  pattern: "unmute",
  desc: "گروپ کھولیں (سب لوگ لکھ سکتے ہیں)",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, pushname, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);

  await conn.groupSettingUpdate(from, "not_announcement");
  reply(`🔊 گروپ کھول دیا گیا از طرف ${pushname}`);
});

cmd({
  pattern: "gname",
  desc: "گروپ کا نام تبدیل کریں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);
  if (!q) return reply("❗ براہ کرم نیا گروپ نام دیں۔");

  await conn.groupUpdateSubject(from, q);
  reply("✅ گروپ کا نام تبدیل کر دیا گیا۔");
});

cmd({
  pattern: "gdesc ?(.*)",
  desc: "گروپ کی تفصیل تبدیل کریں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);
  if (!q) return reply("❗ براہ کرم نئی group description لکھیں۔");

  await conn.groupUpdateDescription(from, q);
  reply("✅ گروپ کی تفصیل تبدیل کر دی گئی۔");
});

cmd({
  pattern: "kick",
  desc: "یوزر کو گروپ سے نکالیں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, mentionByTag, reply }) => {
  if (!isGroup) return reply(errorMsgs.onlyGroup);
  if (!isAdmins) return reply(errorMsgs.notAdmin);
  if (!isBotAdmins) return reply(errorMsgs.botNotAdmin);

  let user = mentionByTag[0] || m.quoted?.sender;
  if (!user) return reply(errorMsgs.noUser);

  await conn.groupParticipantsUpdate(from, [user], "remove");
  reply(`✅ @${user.split('@')[0]} کو گروپ سے نکال دیا گیا۔`);
});
const antilinkGroups = {}; // Memory-based setting per group

// Toggle command
cmd({
  pattern: "antilink",
  desc: "گروپ میں Anti-Link System کو on/off کریں",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isAdmins, q, reply }) => {
  if (!isGroup) return reply("❌ صرف گروپ میں استعمال کریں");
  if (!isAdmins) return reply("❌ صرف ایڈمنز یہ کمانڈ چلا سکتے ہیں");

  if (q === "on") {
    antilinkGroups[from] = true;
    return reply("✅ Anti-Link System اب اس گروپ میں **فعال** ہے");
  } else if (q === "off") {
    delete antilinkGroups[from];
    return reply("❌ Anti-Link System اب **غیر فعال** ہے");
  } else {
    return reply("⚙️ استعمال: `.antilink on` یا `.antilink off`");
  }
});

// Auto-detection of WhatsApp links
const WA_LINK_REGEX = /chat\.whatsapp\.com\/[A-Za-z0-9]{10,}/i;

cmd({
  pattern: ".*",
  hidden: true,
  desc: "Auto kick on WhatsApp link if antilink is on",
  category: "group"
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, body, sender }) => {
  if (!isGroup || !antilinkGroups[from]) return;
  if (!isBotAdmins) return;
  if (isAdmins) return;

  const message = body || "";
  if (WA_LINK_REGEX.test(message)) {
    try {
      await conn.sendMessage(from, { text: `⚠️ WhatsApp گروپ لنک detect ہوا ہے۔ آپ کو نکالا جا رہا ہے...` }, { quoted: mek });
      await conn.groupParticipantsUpdate(from, [sender], "remove");
    } catch (err) {
      console.error("AntiLink error:", err);
    }
  }
});
