import { useState, useEffect } from 'react';
import MemberCard from '../components/MemberCard';
import type { TeamData } from '../types';

const TeamPage = () => {
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch('/data/teams.json')
            .then((res) => res.json())
            .then((data) => {
                setTeamData(data);
                // Set default tab to the first team if available
                if (data.teams.length > 0) {
                    // We'll keep 'all' as default or maybe the first team, let's stick to 'all' or just render all sections
                    // Actually, typically team pages show sections. Let's do sections first.
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching team data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-[#0f172a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!teamData) {
        return (
            <div className="min-h-screen pt-24 text-center text-white bg-[#0f172a]">
                Failed to load team data.
            </div>
        );
    }

    // Helper to get members of a team
    const getTeamMembers = (teamId: string) => {
        return teamData.members.filter(m => m.teamId === teamId);
    };

    return (

        <>

            {/* <div className='h-5'></div> */}
            <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-colors duration-300">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-200 mb-6">
                            Meet the Team
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            The passionate individuals behind CITC who work tirelessly to bring you the best tech events and workshops.
                        </p>
                    </div>

                    {/* Team Sections */}
                    <div className="space-y-20">
                        {teamData.teams.map((team) => {
                            const members = getTeamMembers(team.id);
                            if (members.length === 0) return null;

                            return (
                                <section key={team.id} id={team.id} className="scroll-mt-28 ">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center min-w-max">
                                            {team.name}
                                        </h2>
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                                        {members.map((member) => (
                                            <MemberCard key={member.id} member={member} />
                                        ))}
                                    </div>

                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>)
};

export default TeamPage;
