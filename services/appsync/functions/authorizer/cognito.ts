import { 
    CognitoIdentityProviderClient, 
    AdminGetUserCommand, 
    AdminGetUserCommandInput, 
    AdminGetUserCommandOutput 
} from '@aws-sdk/client-cognito-identity-provider';
import { region, userPoolId } from './config';

const client = new CognitoIdentityProviderClient({ region });

const getUser = async (username: string): Promise<AdminGetUserCommandOutput> => {
    const input: AdminGetUserCommandInput = {
        UserPoolId: userPoolId,
        Username: username
    };
    return await client.send(new AdminGetUserCommand(input));
};

export { getUser };
