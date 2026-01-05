import { useState, useEffect } from 'react';
import { type Event, type EventInput, getAllEvents, createEvent, updateEvent, deleteEvent } from '../../services/eventService';
import { format } from 'date-fns';

const EventManagement = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState<EventInput>({
        title: '',
        slug: '',
        description: '',
        type: 'workshop',
        startAt: '',
        endAt: '',
        location: '',
        capacity: 0,
        image: '',
        tags: [],
        organizer: ''
    });
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventData = {
                ...formData,
                tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            if (editingEvent) {
                await updateEvent(editingEvent._id, eventData);
            } else {
                await createEvent(eventData);
            }
            fetchEvents();
            resetForm();
        } catch (error) {
            console.error('Failed to save event:', error);
            alert('Failed to save event');
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            slug: event.slug,
            description: event.description,
            type: event.type,
            startAt: event.startAt,
            endAt: event.endAt,
            location: event.location,
            capacity: event.capacity,
            image: event.image || '',
            tags: event.tags,
            organizer: event.organizer || ''
        });
        setTagsInput(event.tags.join(', '));
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                fetchEvents();
            } catch (error) {
                console.error('Failed to delete event:', error);
                alert('Failed to delete event');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            description: '',
            type: 'workshop',
            startAt: '',
            endAt: '',
            location: '',
            capacity: 0,
            image: '',
            tags: [],
            organizer: ''
        });
        setTagsInput('');
        setEditingEvent(null);
        setShowModal(false);
    };

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Event
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {events.map((event) => (
                        <li key={event._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.title}</h3>
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                            {event.type}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span>📍 {event.location}</span>
                                        <span>📅 {format(new Date(event.startAt), 'MMM dd, yyyy')}</span>
                                        <span>👥 {event.capacity} capacity</span>
                                    </div>
                                    {event.tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {event.tags.map((tag, idx) => (
                                                <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {editingEvent ? 'Edit Event' : 'Add Event'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type *</label>
                                    <select
                                        required
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="workshop">Workshop</option>
                                        <option value="hackathon">Hackathon</option>
                                        <option value="tech-talk">Tech Talk</option>
                                        <option value="coding-challenge">Coding Challenge</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date & Time *</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={formData.startAt ? new Date(formData.startAt).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setFormData({ ...formData, startAt: new Date(e.target.value).toISOString() })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date & Time *</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={formData.endAt ? new Date(formData.endAt).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setFormData({ ...formData, endAt: new Date(e.target.value).toISOString() })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organizer</label>
                                <input
                                    type="text"
                                    value={formData.organizer}
                                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                    placeholder="e.g., web-development, react, typescript"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
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
                                    {editingEvent ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;
