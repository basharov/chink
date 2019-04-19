import { Request, Response } from 'express'
import { getUser } from '../db/getUser'

export const renderCurrentUserView = async (req: Request, res: Response) => {

    const user = await getUser(req.user.id)

    res.render('profile', {user})

}