import express, { Express } from 'express'
import { initializePassport } from './initializePassport'
import { applyPassportRoutes } from './applyPassportRoutes'
import { configureViews } from './configureViews'
import session from 'express-session'
import { applyRoutes } from './applyRoutes'

const {
    HOST_PORT = 3000,
} = process.env

export const startExpressServer = (): Express => {
    const app = express()

    const passport = initializePassport()

    app.use(session({
        secret: 'anything',
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    configureViews(app)
    applyPassportRoutes(app, passport)
    applyRoutes(app)

    app.listen(HOST_PORT)
    console.log(`Express is listening on port ${HOST_PORT}`)

    return app
}
