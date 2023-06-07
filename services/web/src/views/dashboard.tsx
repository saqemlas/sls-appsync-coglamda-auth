import React from 'react';
import Profile from '../components/profile';
import { UserSession } from '../types/user';

type Props = {
    user: UserSession;
}

const Dashboard: React.FC<Props> = ({ user }) => {
    return (
        <div className='dashboard-container'>
            <h1>
                Dashboard Profile
            </h1>
            <Profile user={user} />
        </div>
    );
};

export default Dashboard;
