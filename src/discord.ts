import { Env } from './env'
import { fetchServer, Server } from './csgo'
import { playerAward, rankPlayers, topScoreAwards, topTimeAwards } from './rank'
import { Client, Intents, TextBasedChannel, MessageEmbed, MessageOptions } from 'discord.js'
import { formatPlayerName, formatPlayerTime, formatServerMap, formatServerName, formatServerPopulation, formatSteamUrl } from './format' // prettier-ignore

export const createBot = (env: Env) => {
    const bot = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    })

    bot.on('ready', async (client) => {
        const channel = await client.channels.fetch(env.discord.channel)

        if (!channel) {
            throw new Error(`channel not found: ${env.discord.channel}`)
        }

        if (!channel.isText()) {
            throw new Error(`channel is not text based: ${env.discord.channel}`)
        }

        await deleteOldMessages(client.user.id, channel)

        const options = await generateMessageOptions(env.csgo.host, env.csgo.port)
        const message = await channel.send(options)

        const updateMessage = async () => {
            const options = await generateMessageOptions(env.csgo.host, env.csgo.port)

            try {
                await message.edit(options)
            } catch (error) {
                /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
                console.error(`failed to update discord message: ${options}\n${error}`)
            }
        }

        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        setInterval(updateMessage, 30000)
    })

    return bot
}

const deleteOldMessages = async (botId: string, channel: TextBasedChannel) => {
    const messages = await channel.messages.fetch({ limit: 25 })
    const botMessages = messages.filter((message) => message.author.id === botId)

    await Promise.all(botMessages.map((message) => message.delete()))
}

const generateMessageOptions = async (host: string, port: number): Promise<MessageOptions> => {
    let server: Server | undefined

    try {
        server = await fetchServer(host, port)
    } catch (error) {
        /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
        console.error(`failed to query csgo server: ${host}:${port}\n${error}`)
    }

    if (!server) {
        const embed = new MessageEmbed()
            .setTitle(':no_entry:  Server Offline')
            .addField('Host', host, true)
            .addField('Port', port.toString(), true)
            .setFooter({ text: 'Last Updated' })
            .setTimestamp()

        return {
            embeds: [embed],
        }
    }

    const map = formatServerMap(server.map)
    const name = formatServerName(server.name)
    const steamUrl = formatSteamUrl(host, port)
    const population = formatServerPopulation(server.population)

    const timeAwards = topTimeAwards(server.players)
    const scoreAwards = topScoreAwards(server.players)

    const names: string[] = []
    const times: string[] = []
    const scores: string[] = []

    for (const player of rankPlayers(server.players)) {
        const name = formatPlayerName(player.name)
        const time = formatPlayerTime(player.time)
        const score = player.score.toString()

        const timeAward = playerAward(player, timeAwards)
        const scoreAward = playerAward(player, scoreAwards)

        names.push(name)
        times.push(timeAward ? `${time} ${timeAward}` : time)
        scores.push(scoreAward ? `${score} ${scoreAward}` : score)
    }

    const namesFmt = names.join('\n')
    const timesFmt = times.join('\n')
    const scoresFmt = scores.join('\n')

    const embed = new MessageEmbed()
        .setTitle(name)
        .addField('Players  :crossed_swords:', population, true)
        .addField('Map  :earth_asia:', map, true)
        .addField('Connect  :game_die:', steamUrl)
        .addField('__Name__', namesFmt, true)
        .addField('__Score__', scoresFmt, true)
        .addField('__Time__', timesFmt, true)
        .setFooter({ text: 'Last Updated' })
        .setTimestamp()

    return {
        embeds: [embed],
    }
}
