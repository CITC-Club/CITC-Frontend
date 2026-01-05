import api from '../lib/axios';

export interface TeamMember {
    _id: string;
    name: string;
    role: string;
    category: 'mentor' | 'executiveCommittee';
    image?: string;
    bio?: string;
    social?: {
        email?: string;
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
    order: number;
    isActive: boolean;
}

export interface TeamMemberInput {
    name: string;
    role: string;
    category: 'mentor' | 'executiveCommittee';
    image?: string;
    bio?: string;
    social?: {
        email?: string;
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
    order?: number;
    isActive?: boolean;
}

export const getAllTeamMembers = async () => {
    const { data } = await api.get('/team');
    return data;
};

export const getTeamMemberById = async (id: string) => {
    const { data } = await api.get(`/team/${id}`);
    return data;
};

export const createTeamMember = async (memberData: TeamMemberInput) => {
    const { data } = await api.post('/team', memberData);
    return data;
};

export const updateTeamMember = async (id: string, memberData: Partial<TeamMemberInput>) => {
    const { data } = await api.put(`/team/${id}`, memberData);
    return data;
};

export const deleteTeamMember = async (id: string) => {
    const { data } = await api.delete(`/team/${id}`);
    return data;
};
