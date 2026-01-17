import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AIRegistrationPage from './pages/AIRegistrationPage';
import JoinClubPage from './pages/JoinClubPage';
import ScrollToTop from './components/ScrollToTop';


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

