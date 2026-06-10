import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardList } from 'lucide-react';
import AddTaskModal from './AddTaskModal';

const AppLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/dashboard' && location.state?.openModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        navigate('/dashboard', { replace: true, state: {} });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleAddTaskClick = () => {
    if (location.pathname !== '/dashboard') {
      // Navigate to dashboard and request to open the modal
      navigate('/dashboard', { state: { openModal: true } });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="app-shell animate-fade-in">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <ClipboardList size={22} />
          </div>
          <h1>Task Manager</h1>
        </div>
        <p className="sidebar-subtitle">Project Dashboard</p>

        <div className="sidebar-actions">
          <button onClick={handleAddTaskClick} className="btn sidebar-btn-primary">
            + Add Task
          </button>
          <button onClick={logout} className="btn sidebar-btn-secondary">
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="app-content">
        {children}
      </main>

      {/* Global Add Task Modal */}
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
