import { poolClient } from './initializePool'
import { IUser } from '../../interfaces/IUser'

export const getUser = async (gitServiceName: string, userId: string): Promise<IUser | undefined> => {

    const usersResult = await poolClient.query(
        `SELECT * from users WHERE 
                                    (primary_git_service_name = $1   AND primary_git_service_user_id = $2)
                                 OR (secondary_git_service_name = $1 AND secondary_git_service_user_id = $2)
                                    
        `,
        [gitServiceName, userId])

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^')
    console.log(gitServiceName, userId)
    console.log(usersResult.rowCount)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^')

    if (usersResult && usersResult.rowCount === 1) {
        return <IUser> usersResult.rows[0]
    }

    return Promise.resolve(undefined)
}
