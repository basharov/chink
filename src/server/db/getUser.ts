import { poolClient } from './initializePool'
import { IUser } from '../../../interfaces/IUser'

export const getUser = async (userId: string): Promise<IUser | undefined> => {

    const usersResult = await poolClient.query(
        'SELECT * from users WHERE github_user_id = $1',
        [userId])

    if (usersResult && usersResult.rowCount === 1) {
        return <IUser> usersResult.rows[0]
    }

    return Promise.resolve(undefined)
}
