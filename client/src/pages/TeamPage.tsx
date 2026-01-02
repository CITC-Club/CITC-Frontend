import Layout from '../components/Layout';
import MemberCard from '../components/MemberCard';
import teamData from '../data/teamMembers.json';

const TeamPage = () => {
    const { mentors, executiveCommittee } = teamData;

    return (
        <Layout>
            <div className="bg-gray-50 dark:bg-transparent py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Meet Our Team</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">The dedicated individuals behind CITC.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b dark:border-gray-700 pb-2">Mentors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {mentors.map((mentor, index) => (
                            <MemberCard
                                key={index}
                                name={mentor.name}
                                role={mentor.role}
                                image={mentor.image}
                                bio={mentor.bio}
                                social={mentor.social}
                            />
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-16 mb-8 border-b dark:border-gray-700 pb-2">Executive Committee</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {executiveCommittee.map((member, index) => (
                            <MemberCard
                                key={index}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                                bio={member.bio}
                                social={member.social}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TeamPage;
