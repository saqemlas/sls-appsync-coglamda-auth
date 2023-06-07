import React, { useState } from 'react';
import { Auth, CognitoUser } from '@aws-amplify/auth';

import Tick from '../../media/tick.svg';
import Cross from '../../media/cross.svg';

const SignInForm: React.FC = ({}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case 'username':
                setEmail(event.target.value);
                return;
            case 'password':
                setPassword(event.target.value);
                return;
            default:
                return;
        }
    };

    function isFormValid(): React.JSX.Element {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?':{}|<>]/.test(password);
        const minLength = 6;
        const isMinLengthValid = password.length >= minLength;
        const isNotEmpty = password !== '';

        return (
            <>
                <div className='checker'>
                    <div>
                        <h5>
                            Email is valid {renderCheck(isEmailValid)}
                        </h5>
                    </div>
                    <div>
                        <h5>
                            Password has Capital character(s) {renderCheck(hasCapitalLetter)}
                        </h5>
                    </div>
                    <div>
                        <h5>
                            Password has Number(s) {renderCheck(hasNumber)}
                        </h5>
                    </div>
                    <div>
                        <h5>
                            Password has no Special character(s) {renderCheck(!hasSpecialCharacter)}
                        </h5>
                    </div>
                    <div>
                        <h5>
                            Password has minimum of {minLength} {renderCheck(isMinLengthValid)}
                        </h5>
                    </div>
                    <div>
                        <h5>
                            Password not empty {renderCheck(isNotEmpty)}
                        </h5>
                    </div>
                </div>
            </>
        );
    };

    function renderCheck(condition: boolean): React.JSX.Element {
        return condition ? <img src={Tick} /> : <img src={Cross} />
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        console.log('submit triggered');

        const user: CognitoUser = await Auth.signIn({
            username: email,
            password: password
        });

        console.log('submit user', user);

        const session = user.getSignInUserSession();
        console.log('submit session', session);

        const jwt = session?.getAccessToken().getJwtToken();
        console.log('submit jwt', jwt);

        /// do more
    }

    return (
        <>
            <form className='form' onSubmit={handleFormSubmit}>
                <div className='form-body'>
                    <div className='form-row'>
                        <label className='form_label' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='form_input'
                            type='text'
                            name='username'
                            value={email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label className='form_label' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='form_input'
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
                {isFormValid()}
                <div className='form-footer'>
                    <button type='submit' >
                        Sign In
                    </button>  
                </div>
            </form>            
        </>
    );
}

export default SignInForm;
