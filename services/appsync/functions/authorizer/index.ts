import { Context, AppSyncAuthorizerResult } from 'aws-lambda';
import { CustomEvent } from './types/appsync';
import { logger } from '@aws-template/common/src/logger';
import { getUser } from './cognito';

export const handler = async (event: CustomEvent, context: Context): Promise<AppSyncAuthorizerResult> => {
    logger.addContext(context);
    logger.info('Event', { event });
    const { authorizationToken, requestContext: { operationName, variables} } = event;

    const isCorrectToken = authorizationToken === 'test';
    const isCorrectOperation = operationName === 'CreateUser';

    if (!isCorrectToken || !isCorrectOperation ) {
        return {
            isAuthorized: false
        };
    }

    const user = await getUser(variables['user'].email);

    const userVerified = user.UserAttributes?.find(x => x.Name === 'email_verified')?.Value;
    const userEmail = user.UserAttributes?.find(x => x.Name === 'email')?.Value;
    const isSameEmails = userEmail === variables['user'].email;
    const userId = user.UserAttributes?.find(x => x.Name === 'sub')?.Value;
    const isSameIds = userId === variables['user'].userId;

    if (!isSameIds || !isSameEmails || userVerified !== 'true' ) {
        return {
            isAuthorized: false
        };
    }
    
    return {
        isAuthorized: true
    };
};
