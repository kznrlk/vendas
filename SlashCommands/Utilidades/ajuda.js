const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js');

module.exports =  {
    name: "ajuda",
    description: "Veja todos meus comandos",
    type: 1,    
    
    run: async (client, interaction, args) => {
        let embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle(`<:bot:1065754246449991762>  _Moderação_`)
        .setDescription(`Olá, meu prefixo é  \`/\`


        <:mod:1066290013597356084> **Comandos Gerais:**
        <:setabranca:1065754274568613888> | Ajuda

        <a:dev:1066290051132174346> **Comandos de Administração:**
        <:setabranca:1065754274568613888> | Sorteio (Sortear)
        <:setabranca:1065754274568613888> | Lock (Tranca um canal para todos)
        <:setabranca:1065754274568613888> | Unlock (Abre o canal para todos)
        <:setabranca:1065754274568613888> | Dm (Manda dm para um usúario)
        <:setabranca:1065754274568613888> | Embed (Embed Configuravel)
        <:setabranca:1065754274568613888> | Renomear (Renomeia o canal)
        <:setabranca:1065754274568613888> | Ticket (Ticket configuravel)
        <:setabranca:1065754274568613888> | Say (Mensagem em embed)
        <:setabranca:1065754274568613888> | Banir (Banir membro)
        <:setabranca:1065754274568613888> | Desbanir (Desbanir membro)
        <:setabranca:1065754274568613888> | Kick (Expulsar membro)
        <:setabranca:1065754274568613888> | Cargo (Dar cargo por reação)
        <:setabranca:1065754274568613888> | Slowmode (Modo lento)
        <:setabranca:1065754274568613888> | Clear (Limpar mensagens)
        <:setabranca:1065754274568613888> | Verificação (Sistema de Verificação)
        <:setabranca:1065754274568613888> | Config (Configura o bot)
        <:setabranca:1065754274568613888> | Castigo (Castigar)
        <:setabranca:1065754274568613888> | Removercastigo (Remover o castigo)
        <:setabranca:1065754274568613888> | Baterponto (Sistema de baterponto)
        

        <a:batblack:1060747244950802492> **Comandos aleatórios:**
        <:setabranca:1065754274568613888> | Cantada (Liberado para todos)
        <:setabranca:1065754274568613888> | Beijar (Liberado para Todos)
        <:setabranca:1065754274568613888> | Tapa (Liberado para Todos)
        <:setabranca:1065754274568613888> | Hack (Liberado para Todos)
        <:setabranca:1065754274568613888> | Imagem (Liberado para Todos)

        <:bot:1065754246449991762> **Utílitarios:**
        <:setabranca:1065754274568613888> | Avatar (Liberado para Todos)
        <:setabranca:1065754274568613888> | Ping (Liberado para Todos)
        <:setabranca:1065754274568613888> | Userinfo (Informações de um usúario)
        <:setabranca:1065754274568613888> | Serverinfo (Informações do servidor)

        `);

        interaction.reply({ embeds: [embed], ephemeral: false })

    }
}
