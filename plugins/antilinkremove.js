module.exports = async function autoKickLink(conn, m) {
    try {
        // اگر آٹو کک بند ہے یا گروپ نہیں ہے، تو کچھ نہ کریں
        if (!global.AUTO_KICK_LINK || !m.isGroup) return;

        // اگر میسج میں WhatsApp گروپ لنک نہ ہو، تو کچھ نہ کریں
        if (!m.text?.includes('https://chat.whatsapp.com/')) return;

        let groupId = m.chat;
        let groupInfo = await conn.groupMetadata(groupId);
        let sender = m.sender;
        let isAdmin = groupInfo.participants.find(p => p.id === sender)?.admin;

        if (!isAdmin) {
            // 🚫 بندے کو گروپ سے نکالیں
            await conn.groupParticipantsUpdate(groupId, [sender], 'remove');

            // 🧹 میسج ڈیلیٹ کریں
            await conn.sendMessage(groupId, {
                delete: {
                    remoteJid: groupId,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.sender
                }
            });

            // ⚠️ وارننگ دیں (اختیاری)
            await conn.sendMessage(groupId, {
                text: `⚠️ لنک بھیجنے کی اجازت نہیں! ${sender.split('@')[0]} کو نکال دیا گیا۔`
            });
        }
    } catch (err) {
        console.error('AutoKickLink Error:', err);
    }
};
