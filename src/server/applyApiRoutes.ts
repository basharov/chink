import { Express } from 'express'
import { cloneRepo } from './git/cloneRepo'

export const applyApiRoutes = (app: Express): void => {

    app.get('/api/repo/clone', async (req, res) => {
        await cloneRepo(req.user.accessToken, req.user.profile.github_profile.username, 'testrepo_private')
        res.json({result: 'cloned'})
    })

}