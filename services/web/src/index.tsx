import './styles/index.css';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import useAuth from './hooks/useAuth';
import App from './app';
import getClient from './client';
import { UserSession } from './types/user';


const Index: React.FC = () => {
    const [user, setUser] = useState<UserSession>({
        authenticated: false,
    });

    useAuth(setUser);
    const client = getClient(user);

    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App 
                        user={user}
                        setUser={setUser}
                    />
                </BrowserRouter>
            </ApolloProvider>
        </React.StrictMode>
    );
}

createRoot(document.getElementById('root')!).render(<Index />);
