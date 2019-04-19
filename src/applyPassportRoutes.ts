import { Express } from 'express'
import { PassportStatic } from 'passport'

export const applyPassportRoutes = (app: Express, passport: PassportStatic) => {
    app.get('/auth/github', passport.authenticate('github'))

    app.get('/auth/github/callback',
        passport.authenticate('github', {failureRedirect: '/'}),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/profile')
        })

    app.get('/auth/gitlab', passport.authenticate('gitlab',
        {
            scope: ['api']
        }))

    app.get('/auth/gitlab/callback',
        passport.authenticate('gitlab', {failureRedirect: '/'}),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/profile')
        })
}