import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface MemberCardProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    social: {
        email?: string;
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
}

const MemberCard = ({ name, role, image, bio, social }: MemberCardProps) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Card Content */}
            <div className="p-6">
                {/* Profile Image */}
                <div className="relative mx-auto w-32 h-32 mb-4">
                    <img
                        className="w-full h-full rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-md group-hover:scale-105 transition-transform duration-300"
                        src={image}
                        alt={name}
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                {/* Name and Role */}
                <div className="text-center mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {role}
                    </p>
                </div>

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-3">
                    {bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {social.email && (
                        <a
                            href={`mailto:${social.email}`}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                    )}
                    {social.linkedin && (
                        <a
                            href={social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                    )}
                    {social.github && (
                        <a
                            href={social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-900 transition-all duration-300 transform hover:scale-110"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {social.twitter && (
                        <a
                            href={social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 transition-all duration-300 transform hover:scale-110"
                            aria-label="Twitter"
                        >
                            <Twitter size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 rounded-xl transition-all duration-300 pointer-events-none"></div>
        </div>
    );
};

export default MemberCard;
