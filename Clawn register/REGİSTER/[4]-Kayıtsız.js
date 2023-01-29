
const serverSettings =require('../../models/sunucuayar')

module.exports = {
  conf: {
    aliases: ["kayıtsız","ks","kayitsiz"],
    name: "kayitsiz",
    help: "kayitsiz"
  },
  run: async (client, message, args, embed, prefix) => { 

    if (!message.guild) return;
    let ayar = await serverSettings.findOne({
    guildID: message.guild.id
  })
  const green = `${client.emojis.cache.find(x => x.name === "yesil_galp")}`
  const red = `${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`

    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`) 
    message.reply({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini kayıtsıza atamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content: "Bu üyeyi kayıtsıza atamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.react(`${client.emojis.cache.find(x => x.name === "yesil_galp")}`)
    member.roles.set(ayar.unregRoles);
    member.setNickname(`${ayar.ikinciTag} İsim ' Yaş`)
    message.reply({ content:`${member} üyesi, ${message.author} tarafından, kayıtsıza atıldı! ${green}`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
  
  },
};