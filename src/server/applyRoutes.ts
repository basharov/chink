import { Express, Response } from 'express'
import { renderCurrentUserView } from './renderers/renderCurrentUserView'

export const applyRoutes = (app: Express): void => {

    app.get('/', (req, res) => {
        res.render('home', {user: req.user})
    })

    app.get('/profile', (req, res: Response) => {
        if (req.user) {
            renderCurrentUserView(req, res)
        } else {
            res.redirect('/')
        }
    })

    app.get('/logout', (req, res) => {
        console.log('logged out!')
        req.logout()
        res.redirect('/')
    })
}