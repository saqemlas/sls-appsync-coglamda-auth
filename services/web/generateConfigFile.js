'use strict';

const fs = require('fs');

const provider = serverless.service.provider;
const awsProvider = serverless.getProvider('aws');

const getSSMParams = async () => {
    const project = serverless.service.custom.project;
    const paths = [
        `/${project}/common/${provider.stage}/cognitoUserPoolId`,
        `/${project}/common/${provider.stage}/cognitoUserPoolClientId`,
        `/${project}/common/${provider.stage}/cognitoUserPoolDomain`,
        `/${project}/appsync/${provider.stage}/endpoint`,
        `/${project}/appsync/${provider.stage}/wss`,
    ];

    const response = await awsProvider.request('SSM', 'getParameters', {
        Names: paths,
    });

    return response.Parameters.reduce((acc, param) => {
        const name = param.Name.split('/').slice(4).join('/');
        acc[name] = param.Value;
        return acc;
    }, {});
}

const createConfig = ([ssmParameters]) => ({
    region: provider.region,
    appsync: {
        url: ssmParameters['endpoint'],
        wss: ssmParameters['wss'],
    },
    cognito: {
        userPoolId: ssmParameters['cognitoUserPoolId'],
        clientId: ssmParameters['cognitoUserPoolClientId'],
        domain: ssmParameters['cognitoUserPoolDomain'],
    },
});

const writeConfigFile = config => {
    fs.writeFileSync('./lib/config.json', JSON.stringify(config));
};

Promise.all([
    getSSMParams()
])
    .then(createConfig)
    .then(writeConfigFile);
