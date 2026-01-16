import { Routes, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AIRegistrationPage from './pages/AIRegistrationPage';
import JoinClubPage from './pages/JoinClubPage';

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/register/ai" element={<AIRegistrationPage />} />
        <Route path="/join" element={<JoinClubPage />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;

