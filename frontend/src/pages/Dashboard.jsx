import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
};

export default Dashboard;
