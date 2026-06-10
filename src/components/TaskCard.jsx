import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { updateTaskStatus, deleteTask } = useTasks();

  const handleCardClick = () => {
    navigate(`/task/${task.id}`);
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      case 'low':
      default:
        return 'badge-low';
    }
  };

  const formatDeadline = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateTaskStatus(task.id, newStatus);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div className="task-card" onClick={handleCardClick}>
      <div className="task-card-header">
        <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority}
        </span>
        {task.status === 'done' && (
          <span className="badge badge-completed">COMPLETED</span>
        )}
      </div>

      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-desc">{task.description}</p>

      <div className="task-card-deadline">
        Deadline: <span className="deadline-date">{formatDeadline(task.deadline)}</span>
      </div>

      <div className="task-card-footer-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="card-status-select"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleDeleteClick}
          className="card-delete-btn"
        >
          Delete
        </button>
      </div>

      <style>{`
        .task-card {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: var(--shadow-sm);
        }

        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .task-card-header {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .task-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
        }

        .task-card-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .task-card-deadline {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .deadline-date {
          color: #f97316; /* Orange color matching screenshot */
          font-weight: 600;
        }

        .task-card-footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.25rem;
        }

        .card-status-select {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.4rem 1.75rem 0.4rem 0.6rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.6rem center;
          background-size: 0.8em;
        }

        .card-status-select:focus {
          border-color: var(--primary);
        }

        .card-delete-btn {
          background-color: #fee2e2;
          color: #ef4444;
          border: none;
          border-radius: var(--radius-sm);
          padding: 0.4rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .card-delete-btn:hover {
          background-color: #fca5a5;
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
