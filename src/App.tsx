import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const AIRegistrationPage = lazy(() => import('./pages/AIRegistrationPage'));
const JoinClubPage = lazy(() => import('./pages/JoinClubPage'));

function App() {
  return (
    <BaseLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/register/ai" element={<AIRegistrationPage />} />
          <Route path="/join" element={<JoinClubPage />} />
        </Routes>
      </Suspense>
    </BaseLayout>
  );
}

export default App;

