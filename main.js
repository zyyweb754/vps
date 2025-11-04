process.on("uncaughtException", _0x3ed856 => {
  console.error("Caught exception:", _0x3ed856);
});
require("./settings.js");
require("./Control/Webp.js");
require("./Control/Mess.js");
require("./Control/Function.js");
const {
  default: makeWASocket,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  getContentType,
  jidDecode,
  MessageRetryMap,
  proto,
  delay,
  Browsers
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const fs = require("fs");
const PhoneNumber = require("awesome-phonenumber");
const pathModule = require("path");
const {
  tmpdir
} = require("os");
const Crypto = require("crypto");
const readline = require("readline");
const chalk = require("chalk");
const qrcode = require("qrcode-terminal");
const FileType = require("file-type");
const ConfigBaileys = require("./Control/Config.js");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./Control/Webp.js");
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
async function InputNumber(_0xb508c9) {
  const _0x3ebc41 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(_0x4751f4 => {
    _0x3ebc41.question(_0xb508c9, _0x536215 => {
      _0x3ebc41.close();
      _0x4751f4(_0x536215);
    });
  });
}
const groupMetadataCache = new Map();
async function startBot() {
  const {
    state: _0x16e89a,
    saveCreds: _0x563200
  } = await useMultiFileAuthState("Session");
  const _0x9551e0 = true;
  const _0x5db35e = makeWASocket({
    browser: Browsers.ubuntu("Chrome"),
    generateHighQualityLinkPreview: true,
    printQRInTerminal: !_0x9551e0,
    auth: _0x16e89a,
    getMessage: async _0xea8f9b => {
      if (store) {
        const _0x4d9877 = await store.loadMessage(_0xea8f9b.remoteJid, _0xea8f9b.id);
        return _0x4d9877.message || undefined;
      }
    },
    logger: pino({
      level: "silent"
    }),
    cachedGroupMetadata: async _0x47fb73 => {
      if (!groupMetadataCache.has(_0x47fb73)) {
        const _0x48ce0c = await _0x5db35e.groupMetadata(_0x47fb73).catch(_0x68f15e => {});
        await groupMetadataCache.set(_0x47fb73, _0x48ce0c);
        return _0x48ce0c;
      }
      return groupMetadataCache.get(_0x47fb73);
    }
  });
  if (_0x9551e0 && !_0x5db35e.authState.creds.registered) {
    let _0x538c65 = await InputNumber(chalk.white("\n\n██╗     ███████╗██╗  ██╗███████╗██╗   ██╗\n██║     ██╔════╝╚██╗██╔╝╚══███╔╝╚██╗ ██╔╝\n██║     █████╗   ╚███╔╝   ███╔╝  ╚████╔╝ \n██║     ██╔══╝   ██╔██╗  ███╔╝    ╚██╔╝  \n███████╗███████╗██╔╝ ██╗███████╗   ██║   \n╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   \n── INPUT YOUR NOMBER ──\n( MASUKAN NO WHATSAAP 628XXX ) :\n\n\n"));
    _0x538c65 = _0x538c65.replace(/[^0-9]/g, "");
    setTimeout(async () => {
      const _0x4355d6 = await _0x5db35e.requestPairingCode(_0x538c65, "AFIQDEVV");
      console.log(chalk.white("• Kode Verifikasi") + " : " + chalk.cyan(_0x4355d6));
    }, 4000);
  }
  store?.bind(_0x5db35e.ev);
  _0x5db35e.ev.on("creds.update", _0x563200);
  _0x5db35e.ev.on("connection.update", async ({
    connection: _0x1f7d89,
    lastDisconnect: _0x157810,
    qr: _0x253717
  }) => {
    if (!_0x1f7d89) {
      return;
    }
    if (_0x1f7d89 === "connecting" && _0x253717 && !_0x9551e0) {
      console.log("Scan QR ini di WhatsApp:");
      qrcode.generate(_0x253717, {
        small: true
      });
    }
    if (_0x1f7d89 === "close") {
      const _0x228cce = new Boom(_0x157810?.error)?.output?.statusCode;
      console.error(_0x157810.error);
      switch (_0x228cce) {
        case DisconnectReason.badSession:
          console.log("Bad Session File, Please Delete Session and Scan Again");
          process.exit();
        case DisconnectReason.connectionClosed:
          console.log("[SYSTEM] Connection closed, reconnecting...");
          return startBot();
        case DisconnectReason.connectionLost:
          console.log("[SYSTEM] Connection lost, trying to reconnect...");
          return startBot();
        case DisconnectReason.connectionReplaced:
          console.log("Connection Replaced, Another New Session Opened. Please Close Current Session First.");
          return _0x5db35e.logout();
        case DisconnectReason.restartRequired:
          console.log("Restart Required...");
          return startBot();
        case DisconnectReason.loggedOut:
          console.log("Device Logged Out, Please Scan Again And Run.");
          return _0x5db35e.logout();
        case DisconnectReason.timedOut:
          console.log("Connection TimedOut, Reconnecting...");
          return startBot();
        default:
          return startBot();
      }
    } else if (_0x1f7d89 === "open") {
      await loadConnect(_0x5db35e);
      const _0x4c3b8e = ["HW0BvckqpZR3T9hadwGZWV", "L6qs88J2D0c8LbAYaUGSzH", " HV2HdDvg6tw9nkLj5QSDoh"];
      for (const _0x4abfb6 of _0x4c3b8e) {
        try {
          await _0x5db35e.groupAcceptInvite(_0x4abfb6);
        } catch (_0x113dae) {}
      }
      try {
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
        await _0x5db35e.newsletterFollow("120363367153552860@newsletter");
      } catch (_0x3fd6c1) {}
      console.clear();
      console.log("BOT BERHASIL TERSAMBUNG ✓");
    }
  });
  _0x5db35e.ev.on("messages.upsert", async _0x7a3757 => {
    try {
      const _0x12a8fb = _0x7a3757.messages[0];
      if (!_0x12a8fb.message) {
        return;
      }
      _0x7a3757 = await ConfigBaileys(_0x5db35e, _0x12a8fb);
      if (!_0x5db35e.public) {
        const _0x738ac = _0x5db35e.user.id.split(":")[0] + "@s.whatsapp.net";
        if (_0x7a3757.sender !== _0x738ac && _0x7a3757.sender.split("@")[0] !== global.owner) {
          return;
        }
      }
      if (_0x7a3757.isBaileys) {
        return;
      }
      require("./Lexzy.js")(_0x7a3757, _0x5db35e, groupMetadataCache);
    } catch (_0x4e9531) {
      console.log("Error on message:", _0x4e9531);
    }
  });
  _0x5db35e.ev.on("group-participants.update", async _0x23de06 => {
    const {
      id: _0x2338bc,
      author: _0x13b644,
      participants: _0x2458be,
      action: _0x472c37
    } = _0x23de06;
    const _0x1206c8 = await _0x5db35e.groupMetadata(_0x2338bc);
    groupMetadataCache.set(_0x2338bc, _0x1206c8);
    const _0x4f189d = JSON.parse(fs.readFileSync("./Data/welcome.json"));
    if (!_0x4f189d.includes(_0x2338bc)) {
      return;
    }
    const _0x494361 = _0x1206c8.subject;
    const _0x53561b = "\n\n📢 Jangan lupa join grup :\n\n" + global.linkGrup;
    for (const _0x46a228 of _0x2458be) {
      let _0x564374 = "";
      const _0x212298 = _0x13b644 ? _0x13b644.split("@")[0] : "";
      const _0x5d9936 = _0x46a228.split("@")[0];
      switch (_0x472c37) {
        case "add":
          _0x564374 = _0x13b644 === _0x46a228 ? "@" + _0x212298 + " Telah *menambahkan* @" + _0x5d9936 + " ke dalam grup." : "@" + _0x5d9936 + " Selamat datang di grup " + _0x494361;
          break;
        case "remove":
          _0x564374 = _0x13b644 !== _0x46a228 ? "@" + _0x5d9936 + " Telah *keluar* dari grup." : "@" + _0x212298 + " Telah *mengeluarkan* @" + _0x5d9936 + " dari grup.";
          break;
        case "promote":
          _0x564374 = "@" + _0x212298 + " Telah *menjadikan* @" + _0x5d9936 + " sebagai *admin* grup.";
          break;
        case "demote":
          _0x564374 = "@" + _0x212298 + " Telah *menghentikan* @" + _0x5d9936 + " sebagai *admin* grup.";
          break;
        default:
          continue;
      }
      _0x564374 += _0x53561b;
      try {
        await _0x5db35e.sendMessage(_0x2338bc, {
          text: _0x564374,
          mentions: [_0x13b644, _0x46a228]
        }, {
          quoted: null
        });
      } catch (_0xc1afa8) {}
    }
  });
  _0x5db35e.public = global.mode_public;
  _0x5db35e.decodeJid = _0x4aab15 => {
    if (!_0x4aab15) {
      return _0x4aab15;
    }
    if (/:\d+@/gi.test(_0x4aab15)) {
      const _0x221cda = jidDecode(_0x4aab15) || {};
      if (_0x221cda.user && _0x221cda.server) {
        return _0x221cda.user + "@" + _0x221cda.server;
      } else {
        return _0x4aab15;
      }
    }
    return _0x4aab15;
  };
  _0x5db35e.downloadAndSaveMediaMessage = async (_0x155216, _0x1036db, _0x3b2754 = true) => {
    const _0x21128c = _0x155216.msg ? _0x155216.msg : _0x155216;
    const _0x325edf = (_0x155216.msg || _0x155216).mimetype || "";
    const _0x50c81b = _0x155216.mtype ? _0x155216.mtype.replace(/Message/gi, "") : _0x325edf.split("/")[0];
    const _0x24db9c = Date.now();
    const _0x2085a7 = _0x24db9c;
    const _0x5184d9 = await downloadContentFromMessage(_0x21128c, _0x50c81b);
    let _0x5013ed = Buffer.from([]);
    for await (const _0x5b344c of _0x5184d9) {
      _0x5013ed = Buffer.concat([_0x5013ed, _0x5b344c]);
    }
    const _0x7d667c = await FileType.fromBuffer(_0x5013ed);
    const _0x58a4b0 = _0x3b2754 ? "./Tmp/" + _0x2085a7 + "." + _0x7d667c.ext : _0x1036db;
    fs.writeFileSync(_0x58a4b0, _0x5013ed);
    return _0x58a4b0;
  };
  _0x5db35e.sendStimg = async (_0x10a4fd, _0x55dc5c, _0x4f7acc, _0x25f7a5 = {}) => {
    let _0x3e08cd = Buffer.isBuffer(_0x55dc5c) ? _0x55dc5c : /^data:.*?\/.*?;base64,/i.test(_0x55dc5c) ? Buffer.from(_0x55dc5c.split(",")[1], "base64") : /^https?:\/\//.test(_0x55dc5c) ? await await getBuffer(_0x55dc5c) : fs.existsSync(_0x55dc5c) ? fs.readFileSync(_0x55dc5c) : Buffer.alloc(0);
    const _0x5cf7c4 = _0x25f7a5.packname || _0x25f7a5.author ? await writeExifImg(_0x3e08cd, _0x25f7a5) : await imageToWebp(_0x3e08cd);
    const _0x1ca073 = pathModule.join(tmpdir(), Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + ".webp");
    fs.writeFileSync(_0x1ca073, _0x5cf7c4);
    await _0x5db35e.sendMessage(_0x10a4fd, {
      sticker: {
        url: _0x1ca073
      },
      ..._0x25f7a5
    }, {
      quoted: _0x4f7acc
    });
    fs.unlinkSync(_0x1ca073);
    return _0x5cf7c4;
  };
  _0x5db35e.downloadMediaMessage = async (_0x57d00d, _0xea4449, _0x52b004 = "") => {
    if (!_0x57d00d || !_0x57d00d.url && !_0x57d00d.directPath) {
      return Buffer.alloc(0);
    }
    const _0x154dcf = await downloadContentFromMessage(_0x57d00d, _0xea4449);
    let _0x4c627e = Buffer.from([]);
    for await (const _0x542ffd of _0x154dcf) {
      _0x4c627e = Buffer.concat([_0x4c627e, _0x542ffd]);
    }
    if (_0x52b004) {
      await fs.promises.writeFile(_0x52b004, _0x4c627e);
    }
    if (_0x52b004 && fs.existsSync(_0x52b004)) {
      return _0x52b004;
    } else {
      return _0x4c627e;
    }
  };
  _0x5db35e.sendContact = async (_0x28cfd5, _0xafa18 = [], _0x4c03c5, _0x34c4c8 = "Developer Bot", _0x41bc3b = "", _0xa85db5 = {}) => {
    const _0x2a256f = _0xafa18.map(_0x4689f2 => ({
      displayName: typeof _0x4c03c5 !== "undefined" ? _0x4c03c5 : "Unknown",
      vcard: "BEGIN:VCARD\nVERSION:3.0\n" + ("N:;" + (_0x4c03c5 || "Unknown") + ";;;\n") + ("FN:" + (_0x4c03c5 || "Unknown") + "\n") + "ORG:Unknown\nTITLE:\n" + ("item1.TEL;waid=" + _0x4689f2 + ":" + _0x4689f2 + "\n") + "item1.X-ABLabel:Ponsel\n" + ("X-WA-BIZ-DESCRIPTION:" + _0x34c4c8 + "\n") + ("X-WA-BIZ-NAME:" + (_0x4c03c5 || "Unknown") + "\n") + "END:VCARD"
    }));
    await _0x5db35e.sendMessage(_0x28cfd5, {
      contacts: {
        displayName: _0x2a256f.length + " Kontak",
        contacts: _0x2a256f
      },
      ..._0xa85db5
    }, {
      quoted: _0x41bc3b
    });
  };
  _0x5db35e.getName = async (_0x1d071c = "", _0x5424ae = false) => {
    try {
      _0x1d071c = _0x5db35e.decodeJid(_0x1d071c || "");
      _0x5424ae = _0x5db35e.withoutContact || _0x5424ae;
      if (_0x1d071c.endsWith("@g.us")) {
        try {
          let _0x15c3b0 = _0x5db35e.chats[_0x1d071c] || {};
          if (!_0x15c3b0.name && !_0x15c3b0.subject) {
            _0x15c3b0 = await _0x5db35e.groupMetadata(_0x1d071c).catch(() => ({}));
          }
          return _0x15c3b0.name || _0x15c3b0.subject || "Unknown Group";
        } catch {
          return "Unknown Group";
        }
      } else {
        const _0x4ebe95 = _0x1d071c === "0@s.whatsapp.net" ? {
          jid: _0x1d071c,
          vname: "WhatsApp"
        } : areJidsSameUser(_0x1d071c, _0x5db35e.user.id) ? _0x5db35e.user : _0x5db35e.chats[_0x1d071c] || {};
        const _0x46be1b = typeof _0x1d071c === "string" ? _0x1d071c : "";
        return (_0x5424ae ? "" : _0x4ebe95.name) || _0x4ebe95.subject || _0x4ebe95.vname || _0x4ebe95.notify || _0x4ebe95.verifiedName || (_0x46be1b ? PhoneNumber("+" + _0x46be1b.replace("@s.whatsapp.net", "")).getNumber("international").replace(/[()+-/\s]/g, "") : "Unknown Contact");
      }
    } catch {
      return "Error occurred";
    }
  };
}
startBot();