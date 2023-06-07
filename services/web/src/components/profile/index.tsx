import React from 'react';
import { UserSession } from 'src/types/user';

type Props = {
    user: UserSession;
}

const Profile: React.FC<Props> = ({ user }) => {

    return (
        <>
            <div className='profile-container'>
                <div className='profile-row'>
                    <h2>
                        Username - {user.user?.username}
                    </h2>
                </div>
                <div className='profile-row'>
                    <h2>
                        First Name - {user.user?.first}
                    </h2>
                </div>
                <div className='profile-row'>
                    <h2>
                        Last Name - {user.user?.last}
                    </h2>
                </div>
                <div className='profile-row'>
                    <h2>
                        Email - {user.user?.email}
                    </h2>
                </div>
                <div className='profile-row'>
                    <h2>
                        Created At - {user.user?.createdAt}
                    </h2>
                </div>
            </div>
        </>
    );
}

export default Profile;
