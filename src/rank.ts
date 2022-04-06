import { Player } from './csgo'

export const rankPlayers = (players: Player[]): Player[] => {
    return players.sort((a, b) => {
        const score = b.score - a.score

        if (score !== 0) {
            return score
        }

        const time = b.time - a.time

        if (time !== 0) {
            return time
        }

        return a.name.localeCompare(b.name)
    })
}

export const topTimeAwards = (players: Player[]): string[] => {
    return players
        .sort((a, b) => b.time - a.time)
        .slice(0, 3)
        .map((player) => player.name)
}

export const topScoreAwards = (players: Player[]): string[] => {
    return rankPlayers(players)
        .slice(0, 3)
        .map((player) => player.name)
}

export const playerAward = (player: Player, topThree: string[]): string | null => {
    if (topThree[0] && player.name === topThree[0]) {
        return ':first_place:'
    }

    if (topThree[1] && player.name === topThree[1]) {
        return ':second_place:'
    }

    if (topThree[2] && player.name === topThree[2]) {
        return ':third_place:'
    }

    return null
}
