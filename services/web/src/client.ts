import { ApolloLink, HttpLink, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { config } from './lib/config';
import { UserSession } from './types/user';

const lamdaToken = process.env.REACT_APP_USER_TOKEN || '';

const getClient = (user: UserSession): ApolloClient<NormalizedCacheObject> => {
  let auth: AuthOptions;

  if (!user.jwt) {
    console.log('auth type token');
    auth = {
      type: AUTH_TYPE.AWS_LAMBDA,
      token: lamdaToken
    };
  } else {
    console.log('auth type jwt');
    auth = {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () => user.jwt!
    };
  }

  const httpLink = new HttpLink({
    uri: config.appsync.url
  });

  const linkConfig = { url: config.appsync.url, region: config.region, auth };

  const link = ApolloLink.from([
    createAuthLink(linkConfig),
    createSubscriptionHandshakeLink(linkConfig, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return client;
}

export default getClient;
