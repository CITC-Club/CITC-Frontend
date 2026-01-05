import { useState, useEffect } from 'react';
import { type TeamMember, type TeamMemberInput, getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../services/teamService';

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState<{ mentors: TeamMember[], executiveCommittee: TeamMember[] }>({ mentors: [], executiveCommittee: [] });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState<TeamMemberInput>({
        name: '',
        role: '',
        category: 'executiveCommittee',
        image: '',
        bio: '',
        social: {
            email: '',
            linkedin: '',
            github: '',
            twitter: ''
        },
        order: 0
    });

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const data = await getAllTeamMembers();
            setTeamMembers(data);
        } catch (error) {
            console.error('Failed to fetch team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await updateTeamMember(editingMember._id, formData);
            } else {
                await createTeamMember(formData);
            }
            fetchTeamMembers();
            resetForm();
        } catch (error) {
            console.error('Failed to save team member:', error);
            alert('Failed to save team member');
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            category: member.category,
            image: member.image || '',
            bio: member.bio || '',
            social: member.social || { email: '', linkedin: '', github: '', twitter: '' },
            order: member.order
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                await deleteTeamMember(id);
                fetchTeamMembers();
            } catch (error) {
                console.error('Failed to delete team member:', error);
                alert('Failed to delete team member');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            category: 'executiveCommittee',
            image: '',
            bio: '',
            social: { email: '', linkedin: '', github: '', twitter: '' },
            order: 0
        });
        setEditingMember(null);
        setShowModal(false);
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    const allMembers = [...teamMembers.mentors, ...teamMembers.executiveCommittee];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Team Member
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {allMembers.map((member) => (
                        <li key={member._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {member.image && (
                                        <img src={member.image} alt={member.name} className="h-12 w-12 rounded-full" />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {member.category === 'mentor' ? 'Mentor' : 'Executive Committee'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as 'mentor' | 'executiveCommittee' })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="mentor">Mentor</option>
                                        <option value="executiveCommittee">Executive Committee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">Social Links</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            value={formData.social?.email || ''}
                                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, email: e.target.value } })}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 dark:text-gray-300">LinkedIn</label>
                                        <input
                                            type="url"
                                            value={formData.social?.linkedin || ''}
                                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 dark:text-gray-300">GitHub</label>
                                        <input
                                            type="url"
                                            value={formData.social?.github || ''}
                                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, github: e.target.value } })}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 dark:text-gray-300">Twitter</label>
                                        <input
                                            type="url"
                                            value={formData.social?.twitter || ''}
                                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingMember ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManagement;
