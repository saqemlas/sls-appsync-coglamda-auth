import { Auth, CognitoUser } from '@aws-amplify/auth';
import { Amplify, Hub } from '@aws-amplify/core';
import { config } from './config';

let isAuthenticating = false;
let isAuthenticationFailure = false;

export const getAuthUser = async (): Promise<CognitoUser> => {
    if (isAuthenticating) {
        console.log('isAuthenticating true');
        return signedInUser;
    } else {
        console.log('isAuthenticating false');
        return Auth.currentAuthenticatedUser();
    }
};

const signedInUser: Promise<CognitoUser> = new Promise((resolve, reject): void => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
        switch (event) {
            case 'codeFlow':
                isAuthenticating = true;
                console.log('codeFlow', data);
                break;
            case 'signUp':
                isAuthenticating = false;
                console.log('signUp', data);
                break;
            case 'signIn':
                isAuthenticating = true;
                console.log('signIn', data);
                resolve(data);
                break;
            case 'signIn_failure':
                isAuthenticating = false;
                isAuthenticationFailure = true;
                console.log('signIn_failure', data);
                reject();
                break;
            case 'signOut':
                isAuthenticating = false;
                console.log('signOut', data);
                break;
        }
    });
});

Amplify.configure({
    Auth: {
        region: config.region,
        userPoolId: config.cognito.userPoolId,
        userPoolWebClientId: config.cognito.clientId,
        oauth: {
            domain: config.cognito.domain,
            scope: ['email', 'openid'],
            redirectSignIn: window.location.origin as string,
            redirectSignOut: window.location.origin as string,
            responseType: 'code',
        },
    },
});
