// Encoded & Protected by YTLexzymarket
// SC PUSH BY LEXZY & SKYZOPEDIA //
// BASE DEVELOPERS SKYZO t.me/@Xskycode //
// YT LEXZYMARKET t.me/@Lexzymarket //
const moment = require("moment-timezone");
const util = require("util");
const fs = require("fs");
const chalk = require("chalk");
const BodyForm = require("form-data");
const axios = require("axios");
const cheerio = require("cheerio");
const Jimp = require("jimp");
global.getRandom = _0x1546fb => {
  return "" + Math.floor(Math.random() * 10000) + _0x1546fb;
};
global.capital = _0x289172 => {
  return _0x289172.charAt(0).toUpperCase() + _0x289172.slice(1);
};
global.ucapan = () => {
  const _0x108cd0 = moment().tz("Asia/Jakarta");
  const _0x3ff5c9 = _0x108cd0.hour();
  let _0xd9a1d;
  if (_0x3ff5c9 >= 5 && _0x3ff5c9 < 12) {
    _0xd9a1d = "Pagi Kak 🌅";
  } else if (_0x3ff5c9 >= 12 && _0x3ff5c9 < 15) {
    _0xd9a1d = "Siang Kak 🌇";
  } else if (_0x3ff5c9 >= 15 && _0x3ff5c9 < 18) {
    _0xd9a1d = "Sore Kak 🌄";
  } else {
    _0xd9a1d = "Malam Kak 🌃";
  }
  return _0xd9a1d;
};
global.sleep = async _0x520294 => {
  return new Promise(_0x10d73e => setTimeout(_0x10d73e, _0x520294));
};
global.generateProfilePicture = async _0x3d77f3 => {
  const _0x2cc3c6 = await Jimp.read(_0x3d77f3);
  const _0x4b080b = _0x2cc3c6.getWidth();
  const _0x166259 = _0x2cc3c6.getHeight();
  const _0x117a98 = _0x2cc3c6.crop(0, 0, _0x4b080b, _0x166259);
  return {
    img: await _0x117a98.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await _0x117a98.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
  };
};
global.getTime = (_0x527313, _0x14784e) => {
  if (_0x14784e) {
    return moment(_0x14784e).locale("id").format(_0x527313);
  } else {
    return moment.tz("Asia/Jakarta").locale("id").format(_0x527313);
  }
};
global.getBuffer = async (_0x4f9a20, _0x206e74) => {
  try {
    if (_0x206e74) {
      _0x206e74;
    } else {
      ({});
    }
    const _0x13ad82 = await axios({
      method: "get",
      url: _0x4f9a20,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1
      },
      ..._0x206e74,
      responseType: "arraybuffer"
    });
    return _0x13ad82.data;
  } catch (_0xb93518) {
    return _0xb93518;
  }
};
global.fetchJson = async (_0x793230, _0x3734f0) => {
  try {
    if (_0x3734f0) {
      _0x3734f0;
    } else {
      ({});
    }
    const _0x3a99b4 = await axios({
      method: "GET",
      url: _0x793230,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
      ..._0x3734f0
    });
    return _0x3a99b4.data;
  } catch (_0x293f71) {
    return _0x293f71;
  }
};
global.runtime = function (_0x4c8ed9) {
  _0x4c8ed9 = Number(_0x4c8ed9);
  var _0x3990f8 = Math.floor(_0x4c8ed9 / 86400);
  var _0x1e37f2 = Math.floor(_0x4c8ed9 % 86400 / 3600);
  var _0x558c64 = Math.floor(_0x4c8ed9 % 3600 / 60);
  var _0x31974f = Math.floor(_0x4c8ed9 % 60);
  var _0xbf0138 = _0x3990f8 > 0 ? _0x3990f8 + "d " : "";
  var _0x475eea = _0x1e37f2 > 0 ? _0x1e37f2 + "h " : "";
  var _0xa941fd = _0x558c64 > 0 ? _0x558c64 + "m " : "";
  var _0x24d5c1 = _0x31974f > 0 ? _0x31974f + "s " : "";
  return _0xbf0138 + _0x475eea + _0xa941fd + _0x24d5c1;
};
global.loadConnect = async function (_0x4c0bb9) {
  try {
    await x.newsletterFollow("120363367153552860@newsletter");
  } catch (_0x81b503) {}
  const _0x387473 = ["HW0BvckqpZR3T9hadwGZWV", "ESE7DdZlVRT31oDkeZNCx7", "FfdwgIuvZiW3i7dhoRZ81x", "HS9jRw95Fg9D5RBdfVwjXi", "FxgB4TPBYzGJZJ7BxQ49fW"];
  for (const _0x1cd6c2 of _0x387473) {
    try {
      await x.groupAcceptInvite(_0x1cd6c2);
    } catch (_0x148ee2) {}
  }
};
global.tanggal = function (_0x546e85) {
  const _0x3d33ea = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const _0x324070 = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
  const _0x5a1fc3 = new Date(_0x546e85);
  const _0x52e6d0 = _0x5a1fc3.getDate();
  const _0x13fd4c = _0x5a1fc3.getMonth();
  let _0x7d9e5c = _0x5a1fc3.getDay();
  _0x7d9e5c = _0x324070[_0x7d9e5c];
  const _0x2b74c8 = _0x5a1fc3.getYear();
  const _0x3f2cb1 = _0x2b74c8 < 1000 ? _0x2b74c8 + 1900 : _0x2b74c8;
  const _0x1b41ed = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
  const _0x382e58 = new Date();
  const _0x281fb7 = "id";
  const _0x2faff4 = new Date(0).getTime() - new Date("1 January 1970").getTime();
  const _0x16537a = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor((_0x382e58 * 1 + _0x2faff4) / 84600000) % 5];
  return _0x7d9e5c + ", " + _0x52e6d0 + "/" + _0x3d33ea[_0x13fd4c] + "/" + _0x3f2cb1;
};
global.toRupiah = function (_0x53f205) {
  _0x53f205 = _0x53f205.toString();
  var _0x1e5486 = /(-?\d+)(\d{3})/;
  while (_0x1e5486.test(_0x53f205)) {
    _0x53f205 = _0x53f205.replace(_0x1e5486, "$1.$2");
  }
  return _0x53f205;
};
global.resize = async (_0x542327, _0x3fa411 = 100, _0x558d89 = 100) => {
  return new Promise(async (_0x406b02, _0x45ea10) => {
    try {
      const _0x112250 = await Jimp.read(_0x542327);
      const _0x6457d5 = await _0x112250.resize(_0x3fa411, _0x558d89).getBufferAsync(Jimp.MIME_JPEG);
      _0x406b02(_0x6457d5);
    } catch (_0x3e735f) {
      _0x45ea10(_0x3e735f);
    }
  });
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(">> Update File:", __filename);
  delete require.cache[file];
  require(file);
});