import { Pool, PoolClient } from 'pg'
import { StoreParameters } from '../loadStoreParameters'

export let poolClient: PoolClient

const initializePool = async (): Promise<PoolClient> => {

    const pool = new Pool({
        database: StoreParameters.PgDatabase,
        user: StoreParameters.PgUser,
        password: StoreParameters.PgPassword,
        port: Number(StoreParameters.PgPort),
        host: StoreParameters.PgHost

    })

    pool.on('error', (err: Error, cl: PoolClient) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    return pool.connect()
}

export const initPgPool = async () => {
    try {
        poolClient = await initializePool()
    } catch (err) {
        console.error(err)
        process.exit(-1)
    }
}
