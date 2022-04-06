import { query } from 'gamedig'

export type Server = {
    map: string
    name: string
    players: Player[]
    population: number
}

export type Player = {
    name: string
    time: number
    score: number
}

type GamedigRaw = {
    time: number
    score: number
}

const isGamedigRaw = (raw: object | undefined): raw is GamedigRaw => {
    return (
        raw !== undefined &&
        typeof (raw as GamedigRaw).time === 'number' &&
        typeof (raw as GamedigRaw).score === 'number'
    )
}

export const fetchServer = async (host: string, port: number): Promise<Server> => {
    const server = await query({
        host,
        port,
        type: 'csgo',
        maxAttempts: 3,
    })

    const players: Player[] = []

    for (const player of server.players) {
        if (player.name !== undefined && isGamedigRaw(player.raw)) {
            players.push({
                name: player.name,
                score: player.raw.score,
                time: Math.round(player.raw.time),
            })
        }
    }

    return {
        players,
        map: server.map,
        name: server.name,
        population: server.players.length,
    }
}
