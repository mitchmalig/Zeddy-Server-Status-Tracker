import { config } from 'dotenv'

export type Env = {
    discord: {
        token: string
        channel: string
    }
    csgo: {
        host: string
        port: number
    }
}

export const loadEnv = (): Env => {
    // Load environment variables from the .env
    // file located in the project root directory.
    config()

    if (!process.env['DISCORD_TOKEN']) {
        throw new Error('missing environment variable: DISCORD_TOKEN')
    }

    if (!process.env['DISCORD_CHANNEL']) {
        throw new Error(`missing environment variable: DISCORD_CHANNEL`)
    }

    if (!process.env['CSGO_HOST']) {
        throw new Error('missing environment variable: CSGO_HOST')
    }

    if (!process.env['CSGO_PORT']) {
        throw new Error('missing environment variable: CSGO_PORT')
    }

    let port: number

    try {
        port = parseInt(process.env['CSGO_PORT'])
    } catch (error) {
        throw new Error('invalid environment variable: CSGO_PORT')
    }

    return {
        discord: {
            token: process.env['DISCORD_TOKEN'],
            channel: process.env['DISCORD_CHANNEL'],
        },
        csgo: {
            port,
            host: process.env['CSGO_HOST'],
        },
    }
}
