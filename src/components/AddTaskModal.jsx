import { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayString();

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 50) {
      newErrors.title = 'Title must be 50 characters or less';
    }

    if (description.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
    }

    if (!deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(deadline);
      const today = new Date(todayStr);
      if (selectedDate < today) {
        newErrors.deadline = 'Deadline must be today or a future date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority: priority.toLowerCase(),
      status: status.toLowerCase(),
      deadline,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStatus('todo');
    setDeadline('');
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="modal-title" className="field-label">TASK TITLE</label>
            <input
              id="modal-title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Design homepage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="modal-desc" className="field-label">DESCRIPTION</label>
            <textarea
              id="modal-desc"
              className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              rows={4}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="modal-priority" className="field-label">PRIORITY</label>
              <select
                id="modal-priority"
                className="form-input form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="modal-status" className="field-label">STATUS</label>
              <select
                id="modal-status"
                className="form-input form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="modal-deadline" className="field-label">DEADLINE</label>
            <input
              id="modal-deadline"
              type="date"
              className={`form-input ${errors.deadline ? 'input-error' : ''}`}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={todayStr}
            />
            {errors.deadline && <span className="error-text">{errors.deadline}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              Create Task
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .close-btn {
          background: #f1f5f9;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .close-btn:hover {
          background-color: #e2e8f0;
          color: var(--text-primary);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .flex-1 {
          flex: 1;
        }

        .form-textarea {
          resize: none;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.85em;
          padding-right: 2rem;
          cursor: pointer;
        }

        .input-error {
          border-color: #f87171;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .btn-cancel {
          background-color: #f1f5f9;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          width: 100px;
          height: 38px;
        }

        .btn-cancel:hover {
          background-color: #e2e8f0;
          color: var(--text-primary);
        }

        .btn-submit {
          background-color: var(--primary);
          color: white;
          width: 130px;
          height: 38px;
        }

        .btn-submit:hover {
          background-color: var(--primary-hover);
        }
      `}</style>
    </div>
  );
};

export default AddTaskModal;
