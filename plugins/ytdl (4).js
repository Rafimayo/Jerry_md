const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')
const ytdl = require('ytdl-core')
const fs = require('fs-extra')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
  pattern: "ytplay",
  alias: ["play"],
  use: '.ytplay song/video name',
  react: "🎵",
  desc: "Play and get audio/video from youtube.",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply('*Please give me song/video name to play*')
    let yts = require("yt-search")
    var arama = await yts(q)
    if (!arama.videos.length) return reply('*No result found*')
    let info = arama.videos[0]
    let { title, thumbnail, url } = info
    let stream = await ytdl(url, { filter: 'audioonly' })
    let buffer = await getBuffer(thumbnail)
    await conn.sendMessage(from, { image: buffer, caption: `*${title}*\n\n*Downloading...*` }, { quoted: mek })
    let audio = await getBuffer(url, { filter: 'audioonly' })
    await conn.sendMessage(from, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: mek })
  } catch (e) {
    l(e)
    try {
      let info = arama.videos[0]
      let { title, thumbnail, url } = info
      let buffer = await getBuffer(thumbnail)
      await conn.sendMessage(from, { image: buffer, caption: `*${title}*\n\n*Downloading...*` }, { quoted: mek })
      let video = await getBuffer(url)
      await conn.sendMessage(from, { video: video, mimetype: 'video/mp4' }, { quoted: mek })
    } catch (e) {
      l(e)
      reply('*Error !!*')
    }
  }
})

cmd({
  pattern: "ytplayv",
  alias: ["playv"],
  use: '.ytplayv song/video name',
  react: "🎥",
  desc: "Play and get video from youtube.",
  category: "downloader",
  filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply('*Please give me song/video name to play*')
    let yts = require("yt-search")
    var arama = await yts(q)
    if (!arama.videos.length) return reply('*No result found*')
    let info = arama.videos[0]
    let { title, thumbnail, url } = info
    let buffer = await getBuffer(thumbnail)
    await conn.sendMessage(from, { image: buffer, caption: `*${title}*\n\n*Downloading...*` }, { quoted: mek })
    let video = await getBuffer(url)
    await conn.sendMessage(from, { video: video, mimetype: 'video/mp4' }, { quoted: mek })
  } catch (e) {
    l(e)
    reply('*Error !!*')
  }
})
