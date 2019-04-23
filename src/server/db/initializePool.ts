import { Pool, PoolClient } from 'pg'
import { logger } from '../startApp'

const {
    PG_HOST = 'localhost',
    PG_PORT = 5432,
    PG_DATABASE = 'chink',
    PG_USER = 'chinkmaster',
    PG_PASSWORD = '',
} = process.env

export let poolClient: PoolClient

const initializePool = async (): Promise<PoolClient> => {

    const pool = new Pool({
        user: PG_USER,
        database: PG_DATABASE,
        password: PG_PASSWORD,
        port: Number(PG_PORT),
        host: PG_HOST

    })

    pool.on('error', (err: Error, cl: PoolClient) => {
        console.error('Unexpected error on idle client', err)
        logger.log('db', {error: err})
        process.exit(-1)
    })

    const client = await pool.connect()

    console.log('Connected to Database')

    logger.log('db', 'connected')

    return client

}

const initPool = async () => {
    poolClient = await initializePool()
}

initPool()
