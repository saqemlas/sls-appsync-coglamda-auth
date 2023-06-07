import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { getUserQuery } from './queries';
import { Query } from './types/graphql';
import { UserSession } from './types/user';
import { SignUp } from './views/signup';
import Base from './views/base';
import Header from './components/header';
import Navbar from './components/navbar';
import Dashboard from './views/dashboard';

type Props = {
    user: UserSession;
    setUser: React.Dispatch<React.SetStateAction<UserSession>>;
}

const App: React.FC<Props> = ({ user, setUser }) => {
    const { refetch } = useQuery<Query>(getUserQuery, { variables: { userId: user.id }});
    const navigate = useNavigate();

    useEffect(() => {
        void getUserData();
    });

    async function getUserData() {
        if (user.id) {
            const { data, error } = await refetch({ userId: user.id });

            if (!data || !data.getUser || error) {
                console.info('get user error', error);
                return;
            }

            user.user = data.getUser;
            setUser(user);
        }
    }

    function handleNavigation(path: string) {
        navigate(path, { replace: true });
    };

    return (
        <>
            <Header />
            <Navbar user={user} handleNavigation={handleNavigation} />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Base 
                            user={user} 
                        />
                    } />
                <Route
                    path='/signup'
                    element={
                        <SignUp />
                    }
                />
                {user.authenticated
                    ?
                    <Route
                        path='/dashboard'
                        element={
                            <Dashboard 
                                user={user} 
                            />
                        }
                    />
                    :
                    null
                }
            </Routes>
        </>
    );
}

export default App;
