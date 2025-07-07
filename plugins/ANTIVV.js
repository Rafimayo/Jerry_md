/*const { cmd } = require("../command");

cmd({
  pattern: "vv",
  alias: ["viewonce", 'retrive'],
  react: '🐳',
  desc: "Owner Only - retrieve quoted message back to user",
  filename: __filename
}, async (client, message, match, { from, isCreator, isOwner, botNumber, isSender}) => {
  try {
    if (!isOwner) {
      return await client.sendMessage(from, {
        text: "*📛 This is an owner command.*"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view once message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});*/


/*const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    delay,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const FileType = require('file-type')
const {cmd , commands} = require('../command')




const commandrvo = {
  pattern: "vv",
  react: "🔎",
  alias: ["veiewonce", "oneview", "🔥"],
  desc: "Check one view things",
  category: "main",
  use: ".vv",
  filename: __filename
};

cmd(commandrvo, async (sock, message, msgData, { from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,
  reply
}) => {
  try {
    const quotedMsg = msgData?.msg?.contextInfo?.quotedMessage;

    if (quotedMsg) {
      if (quotedMsg.imageMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ɪᴍᴀɢᴇ");
        let caption = quotedMsg.imageMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.imageMessage);

        const mediaObject = { url: mediaPath };
        const response = { image: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else if (quotedMsg.videoMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ᴠɪᴅᴇᴏ");
        let caption = quotedMsg.videoMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.videoMessage);

        const mediaObject = { url: mediaPath };
        const response = { video: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else if (quotedMsg.audioMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ᴀᴜᴅɪᴏ");
        let caption = quotedMsg.audioMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.audioMessage);

        const mediaObject = { url: mediaPath };
        const response = { audio: mediaObject, caption };

        return sock.sendMessage(msgData.chat, response);
      } 
      
      else {
        return reply("```ᴛʜɪꜱ ɪꜱ ɴᴏᴛ ᴀ ᴏɴᴇ ᴠɪᴇᴡ ᴍᴀꜱꜱᴇɢᴇ```"); // "This is not a View Once message!"
      }
    } 
    
    else {
      return reply("```ᴛʜɪꜱ ɪꜱ ɴᴏᴛ ᴀ ᴏɴᴇ ᴠɪᴇᴡ ᴍᴀꜱꜱᴇɢᴇ```"); // "Please reply to a View Once message!"
    }
  } catch (error) {
    console.error("Error:", error);
  }
});*/






/*const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');



cmd({
    pattern: "vv",
    react : "🦠",
    alias: ['retrive', "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("> *This is not a ViewOnce message.*");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});*/

/*cmd({
  'pattern': 'vv',
  'alias': ['retrive', 'viewonce'],
  'desc': "Fetch and resend a ViewOnce message content (image/video/voice).",
  'category': 'misc',
  'use': "<query>",
  'filename': __filename
}, async (_0x5a104f, _0x1d2e0c, _0x1759df, {
  from: _0x4d7a74,
  reply: _0x5545e9
}) => {
  try {
    const _0x1c9e5c = _0x1759df.msg.contextInfo.quotedMessage;
    if (_0x1c9e5c && _0x1c9e5c.viewOnceMessageV2) {
      const _0x3798cf = _0x1c9e5c.viewOnceMessageV2;
      if (_0x3798cf.message.imageMessage) {
        let _0x18b540 = _0x3798cf.message.imageMessage.caption;
        let _0x345d25 = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.imageMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'image': {
            'url': _0x345d25
          },
          'caption': _0x18b540
        }, {
          'quoted': _0x1d2e0c
        });
      }
      if (_0x3798cf.message.videoMessage) {
        let _0x4fb901 = _0x3798cf.message.videoMessage.caption;
        let _0x2e752e = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.videoMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'video': {
            'url': _0x2e752e
          },
          'caption': _0x4fb901
        }, {
          'quoted': _0x1d2e0c
        });
      }
      if (_0x3798cf.message.audioMessage) {
        let _0x137019 = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.audioMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'audio': {
            'url': _0x137019
          }
        }, {
          'quoted': _0x1d2e0c
        });
      }
    }
    if (!_0x1759df.quoted) {
      return _0x5545e9("Please reply to a ViewOnce message.");
    }
    if (_0x1759df.quoted.mtype === "viewOnceMessage") {
      if (_0x1759df.quoted.message.imageMessage) {
        let _0x4e23b1 = _0x1759df.quoted.message.imageMessage.caption;
        let _0x14d7c9 = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.imageMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'image': {
            'url': _0x14d7c9
          },
          'caption': _0x4e23b1
        }, {
          'quoted': _0x1d2e0c
        });
      } else {
        if (_0x1759df.quoted.message.videoMessage) {
          let _0x4cf2b0 = _0x1759df.quoted.message.videoMessage.caption;
          let _0x5655fd = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.videoMessage);
          return _0x5a104f.sendMessage(_0x4d7a74, {
            'video': {
              'url': _0x5655fd
            },
            'caption': _0x4cf2b0
          }, {
            'quoted': _0x1d2e0c
          });
        }
      }
    } else {
      if (_0x1759df.quoted.message.audioMessage) {
        let _0x5dfa37 = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.audioMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'audio': {
            'url': _0x5dfa37
          }
        }, {
          'quoted': _0x1d2e0c
        });
      } else {
        return _0x5545e9("> *This is not a ViewOnce message.*");
      }
    }
  } catch (_0x23e307) {
    console.log('Error:', _0x23e307);
    _0x5545e9("An error occurred while fetching the ViewOnce message.");
  }
});*/

/* cmd({
  'pattern': 'vv',
  'alias': ['retrive', 'viewonce'],
  'desc': "Fetch and resend a ViewOnce message content (image/video/voice).",
  'category': 'misc',
  'use': "<query>",
  'filename': __filename
}, async (client, message, args, { from, reply }) => {
  try {
    console.log("Received message:", message);

    
    const quotedMessage = message.msg?.contextInfo?.quotedMessage || message.quoted?.message;
    if (!quotedMessage) {
      return reply("⚠️ Please reply to a message *ViewOnce*.");
    }

    console.log("Quoted message found:", quotedMessage);

    
    const viewOnceContent = quotedMessage.viewOnceMessageV2 || quotedMessage.viewOnceMessage;
    if (!viewOnceContent) {
      return reply("⚠️ This message is not a *ViewOnce*.");
    }

    console.log("ViewOnce content found:", viewOnceContent);

    
    if (viewOnceContent.message?.imageMessage) {
      let caption = viewOnceContent.message.imageMessage.caption || "📷 Image ViewOnce";
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.imageMessage);
      console.log("Image downloaded to:", mediaPath);

      return client.sendMessage(from, {
        image: { url: mediaPath },
        caption: caption
      }, { quoted: message });
    }

    if (viewOnceContent.message?.videoMessage) {
      let caption = viewOnceContent.message.videoMessage.caption || "🎥 Vidéo ViewOnce";
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.videoMessage);
      console.log("Video downloaded to:", mediaPath);

      return client.sendMessage(from, {
        video: { url: mediaPath },
        caption: caption
      }, { quoted: message });
    }

    if (viewOnceContent.message?.audioMessage) {
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.audioMessage);
      console.log("Audio downloaded to:", mediaPath);

      return client.sendMessage(from, {
        audio: { url: mediaPath }
      }, { quoted: message });
    }

    return reply("⚠️ This type of message *ViewOnce* is not supported.");

  } catch (error) {
    console.error("Error fetching ViewOnce message:", error);
    reply("❌ An error occurred while retrieving the message *ViewOnce*.");
  }
}); */
