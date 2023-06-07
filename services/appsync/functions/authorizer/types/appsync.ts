import { AppSyncAuthorizerEvent } from 'aws-lambda';

interface CustomRequestContext { 
    requestContext: {
        operationName: string;
    }
};

type CustomEvent = AppSyncAuthorizerEvent & CustomRequestContext;

export { CustomEvent };
