import express, { Express } from 'express'
import { initializePassport } from './initializePassport'
import { applyPassportRoutes } from './applyPassportRoutes'
import { configureViews } from './configureViews'
import { applyRoutes } from './applyRoutes'
import { getSessionConfig } from './getSessionConfig'
import { applyApiRoutes } from './applyApiRoutes'

const path = require('path')

const {
    HOST_PORT = 3000,
} = process.env

export const startExpressServer = (): Express => {
    const app = express()

    const passport = initializePassport()

    app.use(getSessionConfig())

    app.use(passport.initialize())
    app.use(passport.session())

    const staticPath = path.join(__dirname, '../../dist')

    console.log(`Serving static files from ${staticPath}...`)

    app.use(express.static(staticPath))

    configureViews(app)

    applyPassportRoutes(app, passport)
    applyRoutes(app)
    applyApiRoutes(app)

    app.listen(HOST_PORT)
    console.log(`Express is listening on port ${HOST_PORT}`)

    return app
}
