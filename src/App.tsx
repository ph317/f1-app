import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Home from '@/pages/Home';

import Rankings from '@/pages/Rankings';
import Drivers from '@/pages/Drivers';
import History from '@/pages/History';
import Tracks from '@/pages/Tracks';
import Schedule from '@/pages/Schedule';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/history" element={<History />} />
          <Route path="/tracks" element={<Tracks />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
