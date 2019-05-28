import { startExpressServer } from './startExpressServer'
import { loadStoreParameters } from './loadStoreParameters'
import { initPgPool } from './db/initializePool'

const startApp = async () => {

    await loadStoreParameters()

    await initPgPool()

    startExpressServer()
}

startApp()