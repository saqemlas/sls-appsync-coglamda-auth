import { useEffect } from 'react';

import { getAuthUser } from '../lib/auth';
import { UserSession } from '../types/user';

const useAuth = (setUser: React.Dispatch<React.SetStateAction<UserSession>>): void => {
    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                const user = await getAuthUser();
      
                if (!user) {
                    throw new Error('User not resolved');
                }

                const session = user.getSignInUserSession();
                const jwt = session?.getAccessToken().getJwtToken();
                const id = user.getUsername();

                if (!jwt) {
                    throw new Error('No JWT found.');
                }

                setUser({ 
                    jwt,
                    authenticated: true,
                    id
                });
            } catch (error) {
                console.log('useAuth error', error);
                setUser({
                    authenticated: false
                });
            }
        })();
    }, []);
}

export default useAuth;
