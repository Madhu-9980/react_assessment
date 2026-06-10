import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import AppLayout from '../components/AppLayout';
import { ShieldAlert } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams();
  const { getTaskById } = useTasks();
  
  const task = getTaskById(id);

  if (!task) {
    return (
      <AppLayout>
        <div className="task-detail-error">
          <div className="error-card">
            <ShieldAlert size={48} className="error-icon" />
            <h2>Task Not Found</h2>
            <p>The task you are looking for does not exist or has been deleted.</p>
            <Link to="/dashboard" className="btn btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>
        <style>{`
          .task-detail-error {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5rem 2.5rem;
          }
          .error-card {
            max-width: 400px;
            width: 100%;
            text-align: center;
            padding: 2.5rem;
            background-color: white;
            border-radius: var(--radius-md);
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-md);
          }
          .error-icon {
            color: #ef4444;
            margin-bottom: 1rem;
          }
          .error-card h2 {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
            font-weight: 700;
          }
          .error-card p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
          }
        `}</style>
      </AppLayout>
    );
  }

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

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'todo':
        return 'To Do';
      case 'inprogress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  return (
    <AppLayout>
      <div className="task-detail-content-wrapper animate-fade-in">
        {/* Back Link */}
        <Link to="/dashboard" className="back-to-board-link">
          &larr; Back to board
        </Link>

        {/* Priority Badge & Title */}
        <div className="task-detail-header">
          <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority}
          </span>
          <h1 className="task-detail-title">{task.title}</h1>
        </div>

        {/* Metadata widgets */}
        <div className="detail-meta-card">
          <div className="meta-item">
            <span className="meta-item-label">Status</span>
            <span className="meta-item-value">{getStatusText(task.status)}</span>
          </div>

          <div className="meta-item">
            <span className="meta-item-label">Deadline</span>
            <span className="meta-item-value">{formatDeadline(task.deadline)}</span>
          </div>
        </div>

        {/* Description container */}
        <div className="detail-description-card">
          <h3 className="description-card-label">DESCRIPTION</h3>
          <p className="description-card-text">{task.description || 'No description provided.'}</p>
        </div>
      </div>

      <style>{`
        .task-detail-content-wrapper {
          padding: 2.5rem;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .back-to-board-link {
          color: var(--primary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }

        .back-to-board-link:hover {
          color: var(--primary-hover);
        }

        .task-detail-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .task-detail-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01e;
        }

        .detail-meta-card {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem 2rem;
          display: flex;
          gap: 4rem;
          box-shadow: var(--shadow-sm);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .meta-item-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .meta-item-value {
          font-size: 0.95rem;
          color: #0f172a;
          font-weight: 600;
        }

        .detail-description-card {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .description-card-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .description-card-text {
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.7;
          white-space: pre-wrap;
        }
      `}</style>
    </AppLayout>
  );
};

export default TaskDetail;
