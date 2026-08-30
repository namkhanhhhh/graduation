import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor from './pages/AdminEditor';
import InvitationView from './pages/InvitationView';
import './App.css'; // Keep the general styling

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminEditor />} />
        <Route path="/:slug" element={<InvitationView />} />
        <Route path="/" element={<Navigate to="/sample" />} />
      </Routes>
    </Router>
  );
}

export default App;
