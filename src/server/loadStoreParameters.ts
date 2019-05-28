import SSM = require('aws-sdk/clients/ssm')
import { formatSsmParameters, IStoreParameters } from '../utils/formatSsmParameters'

export let StoreParameters: IStoreParameters

const loadProdParams = (): Promise<IStoreParameters> => {

    console.log('WILL LOAD PROD PARAMS')

    const ssm: SSM = new SSM({
        apiVersion: '2014-11-06',
        region: 'us-east-1'
    })

    const params = {
        Names: [
            'HostPort',

            'GithubClientId',
            'GithubClientSecret',

            'PgHost',
            'PgPort',
            'PgDatabase',
            'PgUser',
            'PgPassword',
        ],
        WithDecryption: false
    }

    return new Promise((resolve, reject) => {
        ssm.getParameters(params, (err, data) => {
            if (err) {
                console.log(err, err.stack)
                reject(err)
            } else {
                StoreParameters = formatSsmParameters(data)
                resolve(StoreParameters)
            }
        })

    })
}

const loadDevParams = async (): Promise<IStoreParameters> => {

    console.log('WILL LOAD DEV PARAMS')

    const {
        HOST_PORT = '8000',

        GITHUB_CLIENT_ID = '',
        GITHUB_CLIENT_SECRET = '',

        PG_HOST = '',
        PG_PORT = '',
        PG_DATABASE = '',
        PG_USER = '',
        PG_PASSWORD = '',
    } = process.env

    StoreParameters = {
        HostPort: HOST_PORT,

        GithubClientId: GITHUB_CLIENT_ID,
        GithubClientSecret: GITHUB_CLIENT_SECRET,

        PgHost: PG_HOST,
        PgPort: PG_PORT,
        PgDatabase: PG_DATABASE,
        PgUser: PG_USER,
        PgPassword: PG_PASSWORD

    }

    return Promise.resolve(StoreParameters)
}

export const loadStoreParameters = async (): Promise<IStoreParameters> => {
    return process.env.ENVIRONMENT === 'production'
        ?
        loadProdParams()
        :
        loadDevParams()
}