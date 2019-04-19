import { poolClient } from './initializePool'

export const addSecondaryProfile = async (gitServiceName: string, userId: string, userProfile: any): Promise<boolean> => {

    await poolClient
        .query(
            'UPDATE users SET secondary_git_service_name = $1, secondary_git_service_user_id = $2, secondary_git_service_profile = $4 WHERE id = $3',
            [gitServiceName, userId, userId, userProfile]
        )

    return Promise.resolve(true)
}
