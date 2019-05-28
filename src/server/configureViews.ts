import { join } from 'path'
import { Express } from 'express'

export const configureViews = (app: Express): void => {
    app.set('view engine', 'pug')
    app.set('views', join(__dirname, 'views'))
}