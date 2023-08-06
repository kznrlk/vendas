const Discord = require("discord.js")

module.exports = {
    name: "unlock", 
    description: "Abra um canal.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply(` Você não possui a permissão \`Gerenciar Canais\` para poder uttilizar este comando.`)
        } else {
            let destrancar = new Discord.EmbedBuilder()
            .setTitle("<:aberto:1066260801310171137> Canal destrancado")
            .addFields({name: ` Esse canal foi destrancado.`, value: `Destrancado por: ${interaction.user}`})
            .setColor('0')
            interaction.reply({embeds: [destrancar]}).then(msg => { 
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(e => {
                console.log(e)
            
                msg.edit(` Ops, algo deu errado ao tentar destrancar este chat.`)
            })
        })

            }
        }        
}