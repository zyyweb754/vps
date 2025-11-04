/* 

 No Enc ? Buy Ke Tele > https://t.me/afiqofficialreal

*/

const chalk = require("chalk");
const fs = require("fs");

global.owner = "6283857160069"
global.namaOwner = "AfiqOfficial"
global.mode_public = true

global.linkChannel = "https://whatsapp.com/channel/0029Vas8fgL9Gv7Q92AMB22a"
global.idChannel = "120363367153552860@newsletter"
global.linkGrup = "https://chat.whatsapp.com/FQOssgw03VhLtcAZ98ShoX?mode=ems_copy_t"
global.thumbnail = "https://files.catbox.moe/3dtvoa.jpg" // THUMB

global.dana = "088216260212"
global.ovo = "Tidak tersedia"
global.gopay = "Tidak tersedia"
global.qris = "https://files.catbox.moe/f6hinw.jpeg" // UBAH AJA

global.JedaPushkontak = 20000
global.JedaJpm = 5000

global.egg = "15" // Isi id egg
global.nestid = "5" // Isi id nest
global.loc = "1" // Isi id location
global.domain = "https://produk.lexzy.my.id"
global.apikey = "ptla_xZZxSITraBdGqPT0Ge4nRb3HxLOZW9yX0oDM82J3" // Isi api ptla
global.capikey = "ptlc_TroIQEI72IEJRtMD2ZomZ1CV7Oeoi0ufEyWSWedle" // Isi api ptlc


let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.blue(">> Update File :"), chalk.black.bgWhite(`${__filename}`))
delete require.cache[file]
require(file)
})