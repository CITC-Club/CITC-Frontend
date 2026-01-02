import Layout from '../components/Layout';

const AboutPage = () => {
    return (
        <Layout>
            <div className="bg-white dark:bg-dark-card py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24 transition-colors duration-300">
                <div className="relative max-w-xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            About CITC
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Computer Engineering Innovation & Tech Club
                        </p>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mission</h3>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            To provide a platform for students to explore their technical interests, develop professional skills, and collaborate on innovative projects that solve real-world problems.
                        </p>

                        <h3 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">Vision</h3>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            To be a leading student organization that nurtures the next generation of tech leaders and innovators.
                        </p>

                        <h3 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">Core Values</h3>
                        <ul className="mt-4 list-disc list-inside text-lg text-gray-500 dark:text-gray-400 space-y-2">
                            <li>Innovation & Creativity</li>
                            <li>Collaboration & Teamwork</li>
                            <li>Technical Excellence</li>
                            <li>Continuous Learning</li>
                            <li>Community Service</li>
                        </ul>

                        <h3 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">Patron</h3>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Er. Amit Shrivatava</span><br />
                            Guiding us with wisdom and experience.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;
