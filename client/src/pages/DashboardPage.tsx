import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const DashboardPage = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-dark-card shadow overflow-hidden sm:rounded-lg mb-8 border border-gray-100 dark:border-gray-700">
                    <div className="px-4 py-5 sm:px-6 flex items-center">
                        <div className="mr-4">
                            {user.role === 'admin' && <FaUserShield className="h-12 w-12 text-primary" />}
                            {user.role === 'mentor' && <FaChalkboardTeacher className="h-12 w-12 text-primary" />}
                            {user.role === 'member' && <FaUserGraduate className="h-12 w-12 text-primary" />}
                            {user.role === 'guest' && <FaUserGraduate className="h-12 w-12 text-gray-400" />}
                        </div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                Welcome back, {user.name}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                Role: <span className="capitalize font-semibold">{user.role}</span> | Email: {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Admin Section */}
                    {user.role === 'admin' && (
                        <div className="bg-white dark:bg-dark-card overflow-hidden shadow rounded-lg col-span-full border border-gray-100 dark:border-gray-700">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Admin Controls</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button className="p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                                        <span className="font-medium block text-gray-900 dark:text-white">Manage Events</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Create, edit, or delete events</span>
                                    </button>
                                    <button className="p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                                        <span className="font-medium block text-gray-900 dark:text-white">Manage Members</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">View and manage club members</span>
                                    </button>
                                    <button className="p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                                        <span className="font-medium block text-gray-900 dark:text-white">Site Settings</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Configure application settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mentor Section */}
                    {(user.role === 'admin' || user.role === 'mentor') && (
                        <div className="bg-white dark:bg-dark-card overflow-hidden shadow rounded-lg lg:col-span-2 border border-gray-100 dark:border-gray-700">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mentor Actions</h3>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                                    You have 3 pending project approvals.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full text-left p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <span className="font-medium block text-gray-900 dark:text-white">Review Projects</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Approve or request changes on student projects</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Member Section */}
                    <div className="bg-white dark:bg-dark-card overflow-hidden shadow rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">My Activity</h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Registered for Tech Talk 2025</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">May 10, 2025</p>
                                </li>
                                <li className="py-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Submitted "Smart Campus" Project</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">April 20, 2025</p>
                                </li>
                            </ul>
                            <div className="mt-4">
                                <button className="text-primary hover:text-teal-700 dark:hover:text-teal-400 text-sm font-medium transition-colors">View all activity</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
