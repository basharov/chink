import express from 'express'
import ejs from 'ejs'
import { join } from 'path'
import passport = require('passport')
import session = require('express-session')

const {
    HOST_PORT = 3000,
    GITHUB_CLIENT_ID = '',
    GITHUB_CLIENT_SECRET = ''
} = process.env

const GitHubStrategy = require('passport-github').Strategy

const app = express()

const githubStrategy = new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${HOST_PORT}/auth/github/callback`
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        return cb(null, profile)
    }
)

passport.use(githubStrategy)

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/github', passport.authenticate('github'))

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/')
    })

app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')

app.set('views', join(__dirname, 'views'))

app.get('/', (req, res) => {
    console.log(req.user)
    res.render('login', {user: req.user})
})

app.get('/logout', (req, res) => {
    console.log('logged out!')
    req.logout()
    res.redirect('/')
})

app.listen(HOST_PORT)