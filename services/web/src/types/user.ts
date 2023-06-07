import { User } from './graphql';

export interface UserSession {
    jwt: string;
    authenticated: boolean;
    id?: string;
    user?: User;
}
