import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeamManagement from '../components/admin/TeamManagement';
import EventManagement from '../components/admin/EventManagement';

const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState<'team' | 'events'>('team');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Welcome, {user?.name}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`${activeTab === 'team'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Team Members
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`${activeTab === 'events'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Events
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="mt-8 pb-12">
                    {activeTab === 'team' && <TeamManagement />}
                    {activeTab === 'events' && <EventManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
