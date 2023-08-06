const Discord = require("discord.js")
//vendo script e bot no pv 
module.exports = {
    name: "lock",
    description: "Tranque um canal",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply(` Você não possui a permissão \`Gerenciar Canais\` para poder uttilizar este comando.`)
        } else {
            let embed = new Discord.EmbedBuilder()
                .setTitle("<:fechado:1066260803797385266> Canal trancado")
                .setColor('0')
                .addFields({name: `Este canal foi trancado.`, value: `Trancado por: ${interaction.user}`})
                interaction.reply({ embeds: [embed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.editReply(` Ops, algo deu errado ao tentar trancar este canal.`)
                })
            })
        }
    }    
}