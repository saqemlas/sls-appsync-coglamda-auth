import React, { useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import { ICredentials } from '@aws-amplify/core';

import Button from '../../components/button';
import { UserSession } from '../../types/user';
import SignInForm from '../signin';

type Props = {
    user: UserSession;
    handleNavigation: (path: string) => void
}

const Header: React.FC<Props> = ({ user, handleNavigation }) => {
    const [signin, setSignIn] = useState<boolean>(false);
    const [signup, setSignUp] = useState<boolean>(false);

    return (
        <div className='navbar'>
            {user.authenticated
                ?
                <>
                    <Button
                        buttonText='SIGN OUT'
                        buttonOnClick={async (): Promise<void> => {
                            await Auth.signOut();
                            window.location.reload();
                        }}
                    />
                    <Button
                        buttonText='Home'
                        buttonOnClick={() => {
                            setSignUp(true);
                            handleNavigation('/');
                        }}
                    />
                    <Button
                        buttonText='Dashboard'
                        buttonOnClick={() => {
                            setSignUp(true);
                            handleNavigation('/dashboard');
                        }}
                    />
                </>
                :
                <>
                    {signin
                        ?
                        <>
                            <Button
                                buttonText='BACK'
                                buttonOnClick={() => {
                                    setSignIn(false);
                                    handleNavigation('/');
                                }}
                            />
                            <SignInForm />
                        </>
                        :
                        <Button
                            buttonText='SIGN IN'
                            buttonOnClick={(): void => setSignIn(true)}
                        />
                    }

                    {signup
                        ?
                        <Button
                            buttonText='BACK'
                            buttonOnClick={() => {
                                setSignUp(false);
                                handleNavigation('/');
                            }}
                        />
                        :
                        <Button
                            buttonText='SIGN UP'
                            buttonOnClick={() => {
                                setSignUp(true);
                                handleNavigation('/signup');
                            }}
                        />
                    }
                </>
            }
        </div>
    );
}

export default Header;
