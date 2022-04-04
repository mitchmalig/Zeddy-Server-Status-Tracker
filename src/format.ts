export const formatSteamUrl = (host: string, port: number) => {
    return `steam://connect/${host}:${port}`
}

export const formatServerMap = (map: string) => {
    return map.length > 50 ? `${map.substring(0, 47)}...` : map
}

export const formatServerName = (name: string) => {
    return name.length > 75 ? `${name.substring(0, 72)}...` : name
}

export const formatServerPopulation = (population: number) => {
    return `${population.toString()} / 64`
}

export const formatPlayerName = (name: string) => {
    return name.length > 30 ? `${name.substring(0, 27)}...` : name
}

export const formatPlayerTime = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60)

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes - hours * 60
    const seconds = totalSeconds - minutes * 60 - hours * 60 * 60

    const hoursFmt = hours.toString()
    const minutesFmt = minutes < 10 && hours !== 0 ? `0${minutes}` : minutes.toString()
    const secondsFmt = seconds < 10 && minutes !== 0 ? `0${seconds}` : seconds.toString()

    if (hours === 0) {
        if (minutes === 0) {
            return secondsFmt
        }

        return `${minutesFmt}:${secondsFmt}`
    }

    return `${hoursFmt}:${minutesFmt}:${secondsFmt}`
}
