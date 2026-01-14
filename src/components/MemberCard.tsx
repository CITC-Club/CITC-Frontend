import React from 'react';
import { Github, Linkedin, Instagram, Mail, User } from 'lucide-react';
import type { Member } from '../types';

interface MemberCardProps {
    member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <div className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Image Container */}
                <div className="relative w-32 h-32 mb-4 rounded-full p-1 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center">
                        {member.photo ? (
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <User className="w-12 h-12 text-slate-400" />
                        )}
                    </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 text-center group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {member.name}
                </h3>

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 text-center">
                    {member.title || (member.department ? member.department : `${member.semester ? member.semester + " Sem" : ""} ${member.type}`)}
                </p>

                {/* Socials */}
                <div className="flex items-center gap-3 mt-4">
                    {member.email && (
                        <a
                            href={`mailto:${member.email}`}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110"
                            title="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    )}

                    {member.socials?.github && (
                        <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300 hover:scale-110"
                            title="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    )}

                    {member.socials?.linkedin && (
                        <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110"
                            title="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}

                    {member.socials?.instagram && (
                        <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                            title="Instagram"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
