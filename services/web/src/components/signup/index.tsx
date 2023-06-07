import React, { useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useMutation } from '@apollo/react-hooks';

import { createUserMutation } from '../../queries';
import { Mutation } from '../../types/graphql';
import Tick from '../../media/tick.svg';
import Cross from '../../media/cross.svg';

const SignUpForm: React.FC = ({}) => {
    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [first, setFirstName] = useState<string>('');
    const [last, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [showVerification, setShowVerification] = useState<boolean>(false);
    const [createUser] = useMutation<Mutation>(createUserMutation);

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                return;
            case 'first':
                setFirstName(event.target.value);
                return;
            case 'last':
                setLastName(event.target.value);
                return;
            case 'email':
                setEmail(event.target.value);
                return;
            case 'password':
                setPassword(event.target.value);
                return;
            case 'confirmpassword':
                setConfirmPassword(event.target.value);
                return;
            case 'verify':
                setVerificationCode(event.target.value);
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
        const isSame = isNotEmpty && password === confirmPassword;

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
                            Confirmed Password and Password Match {renderCheck(isSame)}
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

        try {
            const user = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                }
            });
    
            setUserId(user.userSub);
            setShowVerification(true);
        } catch(error) {
            console.error('Unable to sign up', error);
        }
    }

    async function handleVerifySubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        try {
            const confirmation: string = await Auth.confirmSignUp(userId, verificationCode);

            if (confirmation !== 'SUCCESS') {
                console.error('Unable to confirm sign up', { confirmation });
                throw Error('Confirmation Failed');
            }
            
            const { data, errors } = await createUser({
                variables: {
                    user: {
                        userId,
                        username,
                        first,
                        last,
                        email
                    }
                }    
            });
    
            if (!data || !data.createUser || errors) {
                console.error('create user error', errors);
                return;
            }

            window.location.reload();
        } catch(error) {
            console.error('Unable to confirm sign up', error);
        }
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
                            value={username}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label className='form_label' htmlFor='firstName'>
                            First Name
                        </label>
                        <input
                            className='form_input'
                            type='text'
                            name='first'
                            value={first}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label className='form_label' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input
                            className='form_input'
                            type='text'
                            name='last'
                            value={last}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='form-row'>
                        <label className='form_label' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className='form_input'
                            type='text'
                            name='email'
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
                    <div className='form-row'>
                        <label className='form_label' htmlFor='confirmpassword'>
                            Confirm Password
                        </label>
                        <input
                            className='form_input'
                            type='password'
                            name='confirmpassword'
                            value={confirmPassword}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
                {isFormValid()}
                <div className='form-footer'>
                    <button type='submit' >
                        Sign Up
                    </button>  
                </div>
            </form>
            {showVerification
            ?
                <form id='verification' className='form' onSubmit={handleVerifySubmit}>
                    <div className='form-row'>
                        <label className='form_label'>
                            Enter Verification Code Here
                        </label>
                        <input
                            className='form_input'
                            type='text'
                            name='verify'
                            value={verificationCode}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='form-footer'>
                        <button type='submit' >
                            Send
                        </button>  
                    </div>
                </form>
            :
                null
            }
            
        </>
    );
}

export default SignUpForm;
