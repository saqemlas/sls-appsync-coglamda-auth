import React from 'react';
import { UserSession } from '../types/user';

type Props = {
    user: UserSession;
}

const Base: React.FC<Props> = ({ user }) => {

    return (
        <div>
            {user.authenticated
            ?
            <h1>
                Hello, {user.user?.username}
            </h1>
            :
            <h1>
                Hello, Please Sign In
            </h1>
            }
        </div>
    );
}

export default Base;
