import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../lib/axios';
import { format } from 'date-fns';
import { FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import eventsData from '../data/events.json';

interface Event {
    _id: string;
    title: string;
    description: string;
    type?: string;
    startAt: string;
    endAt?: string;
    location: string;
    capacity: number;
    attendees: string[];
    image?: string;
    tags?: string[];
    organizer?: string;
}

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await api.get('/events');
                setEvents(data);
            } catch (error) {
                console.error('Failed to fetch events, using dummy data', error);
                // Use dummy data as fallback
                setEvents(eventsData.events as Event[]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getEventTypeBadge = (type?: string) => {
        const badges: Record<string, { bg: string; text: string; label: string }> = {
            'workshop': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200', label: 'Workshop' },
            'coding-challenge': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200', label: 'Coding Challenge' },
            'hackathon': { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', label: 'Hackathon' },
            'tech-talk': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', label: 'Tech Talk' },
        };

        const badge = type ? badges[type] : null;
        if (!badge) return null;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.label}
            </span>
        );
    };

    return (
        <Layout>
            <div className="bg-gray-50 dark:bg-transparent py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Upcoming Events</h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Join us for workshops, hackathons, and tech talks.</p>
                    </div>

                    {loading ? (
                        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">Loading events...</div>
                    ) : (
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <div key={event._id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                    {event.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">{event.title}</h3>
                                            {getEventTypeBadge(event.type)}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{event.description}</p>

                                        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <FaCalendar className="mr-2 text-blue-600 dark:text-blue-400" />
                                                <span>{format(new Date(event.startAt), 'PPP p')}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaUsers className="mr-2 text-blue-600 dark:text-blue-400" />
                                                <span>{event.attendees.length} / {event.capacity} Attendees</span>
                                            </div>
                                        </div>

                                        {event.tags && event.tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {event.tags.slice(0, 3).map((tag, index) => (
                                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default EventsPage;

