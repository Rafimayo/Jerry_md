const { cmd } = require('../config')
const { cmd, commands } = require('../command')
cmd({
    pattern: "boom",
    desc: "Repeat words multiple times",
    category: "fun",
    react: "💥",
    filename: __filename
},
async (conn, mek, m, { args }) => {
    try {
        if (args.length === 0) {
            return m.reply("⚡ Usage: boom word/number\n👉 Example: boom hii/5")
        }

        // Join args (in case of spaces)
        const input = args.join(" ")
        const [word, countStr] = input.split("/")

        if (!word || !countStr) {
            return m.reply("⚡ Wrong format!\n👉 Use: boom hii/5")
        }

        const count = parseInt(countStr)
        if (isNaN(count) || count < 1 || count > 50) {
            return m.reply("⚡ Please give a valid number (1-50)")
        }

        // Repeat word
        const result = Array(count).fill(word).join(" ")
        await m.reply(result)

    } catch (e) {
        console.log("Boom plugin error:", e)
        m.reply("❌ Something went wrong!")
    }
})
