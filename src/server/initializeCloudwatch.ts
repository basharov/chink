const lawgs = require('lawgs')

export const initializeCloudwatch = (): any => {

    const {
        AWS_ACCESS_KEY_ID = '',
        AWS_SECRET_ACCESS_KEY = '',
    } = process.env

    lawgs.config({
        aws: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1'
        }
    })

    return lawgs.getOrCreate('ChinkLogs')
}