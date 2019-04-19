import { Express, Request, Response } from 'express'
import { PassportStatic } from 'passport'

const successCallback = (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(req.query.state)

    const query = JSON.parse((<any> req).query.state)
    console.log('QUERY:')
    console.log(query)

    console.log(query.query.primary_id)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$')

    const params = query.query.primary_id ? `?primary_id=${query.query.primary_id}` : ''

    res.redirect(`/profile${params}`)
}

const getState = (req: Request) => {
    const state: any = {
        query: req.query
    }

    if (req.user) {
        state.provider = req.user.provider
        state.userId = req.user.id
    }

    return state
}

export const applyPassportRoutes = (app: Express, passport: PassportStatic) => {

    app.get('/auth/github', (req, res, next) => {

        const state = getState(req)

        passport.authenticate('github',
            {
                state: JSON.stringify(state)
            }
        )(req, res, next)
    })

    app.get('/auth/github/callback',
        passport.authenticate(
            'github',
            {failureRedirect: '/'}),
        successCallback)

}