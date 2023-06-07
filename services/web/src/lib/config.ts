import configFile from './config.json';

export const config = configFile as Config;

export interface Config {
    region: string;
    appsync: {
        url: string;
        wss: string;
    },
    cognito: {
        userPoolId: string;
        clientId: string;
        domain: string;
    },
}
