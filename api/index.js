const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

const sushiData = require('../lib/sushiTeams.json')
let sushiServer
let sushiTeams
let leagueOfLegendsChampions
let leagueOfLegendsChampionImages

axios
  .get('https://ddragon.leagueoflegends.com/realms/jp.json')
  .then((version) => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${version.data.v}/data/ja_JP/champion.json`
      )
      .then((champions) => {
        leagueOfLegendsChampions = champions.data.data
      })
  })

client.on('ready', () => {
  console.log(`${client.user.tag} is ready.`)
  sushiServer = client.guilds.cache.get(process.env.DISCORD_SERVER_ID)
  sushiTeams = sushiServer.roles.cache.filter(
    (role) => role.name.slice(0, -3) in sushiData
  )
})

client.on('guildMemberAdd', (member) => {
  const sushiList = new Discord.MessageEmbed()
    .setTitle('おすしサーバーへようこそ！')
    .setDescription(
      'あなたがbotではないことの確認のために、すきな軍艦の名前を選んで送信してください！'
    )

  Object.keys(sushiData).forEach((key) => {
    sushiList.addField(sushiData[key].desc, key.toString(), false)
  })

  member.send(sushiList)
})

client.on('message', (message) => {
  if (message.guild === null) {
    if (message.content in sushiData) {
      const trustedUser = sushiServer.members.cache.find(
        (member) => member.id === message.author.id
      )

      const selectedRole = sushiServer.roles.cache.find(
        (role) => role.name === `${message.content}チーム`
      )

      const currentRoleStatus = trustedUser.roles.cache.find(
        (role) => role.name.slice(0, -3) in sushiData
      )

      const isRoleAlreadySet = currentRoleStatus ? true : false

      if (!isRoleAlreadySet) {
        message.author.send(
          `${message.content}がお好きなんですね！\nフレンドと一緒に${message.content}愛を深めましょう！`
        )

        trustedUser.roles.add(selectedRole)
      } else {
        message.author.send(
          `あなたはすでに${currentRoleStatus.name}に所属しています！\nチームの変更はBOSSロールがついたリーダーに直接声をかけてくださいね！`
        )
      }
    }
  }
})

client.on('error', console.error)

client.login(process.env.BOT_TOKEN)

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/teams', function(req, res) {
  const result = {}
  const onlineCounts = {}
  sushiTeams.forEach((role) => {
    const onlineCount = 0
    result[role.name] = role.members

    onlineCounts[role.name] = role.members.filter(
      (member) => member.presence.status === 'online'
    )
  })
  res.send({ teamData: result, onlineStatus: onlineCounts })
})

app.get('/champions', function(req, res) {
  res.send(leagueOfLegendsChampions)
})

module.exports = {
  path: '/api/',
  handler: app
}
