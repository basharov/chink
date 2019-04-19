import { Request, Response } from 'express'
import { getUser } from '../db/getUser'
import { addSecondaryProfile } from '../db/addSecondaryProfile'

export const renderCurrentUserView = async (req: Request, res: Response) => {

    let user: any = {}

    console.log('???????????????????????????????')
    console.log(req.query)
    console.log('???????????????????????????????')

    if (req.query.primary_id) {
        console.log('Will add to an existing user')
        user = await addSecondaryProfile(req.user.provider, req.query.primary_id, {})

    } else {
        console.log('Logged in as its own user')
        user = await getUser(req.user.provider, req.user.id)

    }

    res.render('profile', {user})

}