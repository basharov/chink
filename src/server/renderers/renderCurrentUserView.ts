import { Request, Response } from 'express'
import { getUser } from '../db/getUser'
import { loadRepos } from '../loadRepos'

export const renderCurrentUserView = async (req: Request, res: Response): Promise<void> => {

    const {user: {profile, accessToken}} = req

    const user = await getUser(profile.github_user_id)

    const repos = await loadRepos(accessToken)

    res.render('profile', {user, repos})

}