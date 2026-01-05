import api from '../lib/axios';

export interface Event {
    _id: string;
    title: string;
    slug: string;
    description: string;
    type: 'workshop' | 'hackathon' | 'tech-talk' | 'coding-challenge';
    startAt: string;
    endAt: string;
    location: string;
    capacity: number;
    image?: string;
    tags: string[];
    organizer?: string;
    attendees: string[];
}

export interface EventInput {
    title: string;
    slug: string;
    description: string;
    type: 'workshop' | 'hackathon' | 'tech-talk' | 'coding-challenge';
    startAt: string;
    endAt: string;
    location: string;
    capacity: number;
    image?: string;
    tags?: string[];
    organizer?: string;
}

export const getAllEvents = async () => {
    const { data } = await api.get('/events');
    return data;
};

export const getEventBySlug = async (slug: string) => {
    const { data } = await api.get(`/events/${slug}`);
    return data;
};

export const createEvent = async (eventData: EventInput) => {
    const { data } = await api.post('/events', eventData);
    return data;
};

export const updateEvent = async (id: string, eventData: Partial<EventInput>) => {
    const { data } = await api.put(`/events/${id}`, eventData);
    return data;
};

export const deleteEvent = async (id: string) => {
    const { data } = await api.delete(`/events/${id}`);
    return data;
};
