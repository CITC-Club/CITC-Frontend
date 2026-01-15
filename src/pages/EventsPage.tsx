import { useState, useEffect } from 'react';
import { Calendar, History } from 'lucide-react';
import EventCard from '../components/EventCard';
import type { EventData } from '../types';

const EventsPage = () => {
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/events.json')
            .then((res) => res.json())
            .then((data) => {
                setEventData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching event data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-white dark:bg-[#0f172a] transition-colors duration-300">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!eventData) {
        return (<>
            <div className='h-10'></div>
            <div className="min-h-screen pt-24 text-center text-slate-900 dark:text-white bg-white dark:bg-[#0f172a] transition-colors duration-300">
                Failed to load event data.
            </div></>
        );
    }

    const runningEvents = eventData.events.filter(e => e.status === 'running');
    const upcomingEvents = eventData.events.filter(e => e.status === 'upcoming'); // Treat upcoming as distinct or group with running?
    // User asked for "running events" (implying active registration) and "past events".
    // I'll group 'running' and 'upcoming' into the top section if they have registration links, or just 'running' as requested.
    // Let's group 'running' and 'upcoming' as "Upcoming & Running".

    // Actually user specifically said "running event should show the event details and register link".

    const activeEvents = [...runningEvents, ...upcomingEvents];
    const pastEvents = eventData.events.filter(e => e.status === 'past');

    return (<>
        {/* <div className='h-10'></div> */}
        <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-200 mb-6">
                        Events & Workshops
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Join us in our upcoming events or take a look at what we've accomplished so far.
                    </p>
                </div>

                {/* Active Events Section */}
                {activeEvents.length > 0 && (
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center min-w-max">
                                <Calendar className="w-8 h-8 text-cyan-500" /> Running & Upcoming
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Past Events Section */}
                {pastEvents.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
                            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-400 text-center min-w-max">
                                <History className="w-8 h-8" /> Past Events
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
        )</>)
};


export default EventsPage;
