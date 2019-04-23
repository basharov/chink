import { startExpressServer } from './startExpressServer'
import { initializeCloudwatch } from './initializeCloudwatch'

export const logger = initializeCloudwatch()

const startApp = async () => {

    const express = startExpressServer()
}

startApp()