const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
 ]
});

const TARGET_CHANNEL = "経験争覇"; // ←ここをチャンネル名に変更

const members = [
"桜小路","無課金🍑潤","きー","後藤","マルちゃん#9554","じゅ",
"風澤 博生","とろ","まつ","(え・ω・れん)",
"ao_haya","Jelly","メンバー13","メンバー14",
"メンバー15","メンバー16","メンバー17","メンバー18",
"メンバー19","メンバー20","メンバー21","メンバー22",
"メンバー23","メンバー24","メンバー25","メンバー26",
"メンバー27","メンバー28","メンバー29","メンバー30",
"メンバー31","メンバー32"
];

const items = {};

members.forEach(m => items[m] = 0);

client.on("messageCreate", (msg) => {

 if (msg.author.bot) return;

 // ★チャンネル制限
 if (msg.channel.name !== TARGET_CHANNEL) return;

 const text = msg.content.trim();
let updated = false;

 if (!isNaN(text)) {
   const name = msg.member.displayName;

   if (items[name] !== undefined) {
     items[name] = parseInt(text);
   updated = true;
   }
 }

 const parts = text.split(" ");

 if (parts.length === 2 && !isNaN(parts[1])) {

   const name = parts[0];

   if (items[name] !== undefined) {
     items[name] = parseInt(parts[1]);
   updated = true;
   }

 }

 if (updated) {
 let table = "🔨 金槌所持数\n\n";

 members.forEach((m,i)=>{
   table += `${String(i+1).padStart(2,"0")} ${m} ${items[m]}\n`;
 });

 msg.channel.send(table);
}

});

client.login(process.env.TOKEN);