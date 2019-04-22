import { Request, Response } from 'express'
import { getUser } from '../db/getUser'
import { loadRepos } from '../loadRepos'
import { cloneRepo } from '../git/cloneRepo'

export const renderCurrentUserView = async (req: Request, res: Response) => {

    const user = await getUser(req.user.profile.github_user_id)

    const repos = await loadRepos(req.user.accessToken)

    res.render('profile', {user, repos})

}