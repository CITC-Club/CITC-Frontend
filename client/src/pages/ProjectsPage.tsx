import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../lib/axios';
import { FaGithub } from 'react-icons/fa';

interface Project {
    _id: string;
    title: string;
    shortDesc: string;
    tags: string[];
    repoUrl: string;
    contributors: { name: string }[];
}

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Project Showcase</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Discover what our members are building.</p>
                </div>

                {loading ? (
                    <div className="text-center mt-12 text-gray-500 dark:text-gray-400">Loading projects...</div>
                ) : (
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white dark:bg-dark-card overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow flex flex-col border border-gray-100 dark:border-gray-700">
                                <div className="px-4 py-5 sm:p-6 flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                        {project.repoUrl && (
                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:hover:text-primary">
                                                <FaGithub size={20} />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.shortDesc}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium">Contributors: </span>
                                        {project.contributors.map(c => c.name).join(', ')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProjectsPage;
