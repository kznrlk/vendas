const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "sorteio",
  description: "Criar uma sorteio",
  options: [
    {
      name: "premio",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Qual será o premio?",
      required: true,
    },
    {
      name: "desc",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Descrição do premio?",
      required: true,
    },
    {
      name: "tempo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Selecione o tempo do sorteio",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "5 Minutos",
          value: "5m",
        },
        {
          name: "10 Minutos",
          value: "10m",
        },
        {
          name: "15 Minutos",
          value: "15m",
        },
        {
          name: "30 Minutos",
          value: "30m",
        },
        {
          name: "45 Minutos",
          value: "45m",
        },
        {
          name: "1 Hora",
          value: "1h",
        },
        {
          name: "2 Horas",
          value: "2h",
        },
        {
          name: "5 Horas",
          value: "5h",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "24 Horas",
          value: "24h",
        },
        {
          name: "1 Dia",
          value: "24h",
        },
        {
          name: "3 dias",
          value: "72h",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ModerateMembers
      )
    ) {
      return interaction.reply({
        content: `**⛔ | ${interaction.user}, Você precisa da permissão \`MODERATE_MEMBERS\` para usar este comando!**`,
        ephemeral: true,
      });
    } else {
      let premio = interaction.options.getString("premio");
      let tempo = interaction.options.getString("tempo");
      let desc = interaction.options.getString("desc");

      let duracao = ms(tempo);

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("botao")
          .setEmoji("🎉")
          .setStyle(2)
      );

      let click = [];

      const embed = new Discord.EmbedBuilder()
        .setTitle(`**🎉 Novo sorteio!**`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
          `Patrocinador : ${interaction.user}\nPremio: **${premio}**\nDescrição do sorteio: **${desc}** \n\ Duração: **${tempo}**  \n\n\ Reaja "🎉" para participar do sorteio.`
        )
        .setTimestamp(Date.now() - ms(tempo))
        .setFooter({ text: "Kiev" })
        .setColor(`0`);

      let erro = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`Não foi possível promover o soteio!`);

      const msg = await interaction
        .reply({
          embeds: [embed],
          components: [button],
        })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: ms(tempo),
      });

      coletor.on("end", (i) => {
        interaction.editReply({
          components: [],
        });
      });

      coletor.on("collect", (i) => {
        if (i.customId === "botao") {
          if (click.includes(i.user.id))
            return i.reply({
              content: `**Você ja está no sorteio.**`,
              ephemeral: true,
            });
          click.push(i.user.id);
          interaction.editReply({
            embeds: [embed],
          });
          i.reply({
            content: "**Você entrou no sorteio**",
            ephemeral: true,
          });
        }
      });

      setTimeout(() => {
        let ganhador = click[Math.floor(Math.random() * click.length)];

        if (click.length == 0)
          return interaction.followUp(
            `**Sorteio cancelado pois ninguem participou!**`
          );
        interaction.followUp(
          `**Parabens <@${ganhador}> você ganhou o ${premio}**`
        );
      }, duracao);
    }
  },
};
