import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaRocket, FaCode, FaUsers, FaCalendar } from 'react-icons/fa';

const HomePage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="block">Computer Engineering</span>
                            <span className="block text-primary mt-2">Innovation & Tech Club</span>
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Pioneering technological innovation and excellence for over a decade
                        </p>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                            CITC is a student-driven community dedicated to fostering innovation, collaboration, and technical excellence through workshops, hackathons, and real-world projects.
                        </p>

                        {/* Statistics */}
                        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary">10+</div>
                                <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">Years Active</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
                                <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary">100+</div>
                                <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">Events</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/team"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-primary bg-white dark:bg-gray-800 border-2 border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                                Meet Our Team
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <div className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Activities We Are Actively Doing
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Innovation */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-6">
                                <FaRocket className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Encouraging creative solutions and out-of-the-box thinking for real-world problems.
                            </p>
                        </div>

                        {/* Workshops */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-6">
                                <FaCode className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Workshops</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Regular hands-on sessions on the latest technologies and frameworks.
                            </p>
                        </div>

                        {/* Community */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-6">
                                <FaUsers className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Building a strong network of like-minded individuals and mentors.
                            </p>
                        </div>

                        {/* Events */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-6">
                                <FaCalendar className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Events</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Organizing hackathons, tech talks, and networking events throughout the year.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
