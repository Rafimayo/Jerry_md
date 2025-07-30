

const { cmd } = require('../lib/command')
const config = require('../config')

cmd({
  pattern: "tagall ?(.*)",
  fromMe: true, // اگر آپ اسے گروپ ایڈمنز کے لیے بھی فعال کرنا چاہتے ہیں تو false کر دیں
  desc: "Tag all group members",
  type: "group"
}, async (message, match, m) => {
  if (!message.isGroup) return await message.send("THIS COMMAND ONLY USE IN GROUPS")
  
  const groupMetadata = await message.client.groupMetadata(message.chat)
  const members = groupMetadata.participants.map(p => p.id)
  const text = match ||"tagging all members:"

  let mentions = members.map((id) => "@" + id.split("@")[0]).join("\n")

  return await message.send(`${text}\n\n${mentions}`, {
    mentions: members,
  })
})
