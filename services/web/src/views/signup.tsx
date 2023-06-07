import React from 'react';
import SignUpForm from '../components/signup';

export const SignUp: React.FC = (): React.JSX.Element => {

    return (
        <>
            <h2 className='signup-title'>
                Sign Up Form
            </h2>
            <SignUpForm />
        </>
    );
};
