import { Request, Response } from 'express'
import { getUser } from '../db/getUser'

export const renderCurrentUserView = async (req: Request, res: Response) => {

    // console.log(req.user)
    const user = await getUser(req.user.provider, req.user.id)

    res.render('profile', {user})
}