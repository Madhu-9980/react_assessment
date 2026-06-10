import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import AppLayout from '../components/AppLayout';
import TaskCard from '../components/TaskCard';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const { tasks } = useTasks();

  const [searchText, setSearchText] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchText.toLowerCase());

    const matchesPriority =
      priorityFilter === 'all' || task.priority?.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesPriority;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'inprogress');
  const doneTasks = filteredTasks.filter((t) => t.status === 'done');

  return (
    <AppLayout>
      <div className="dashboard-content-wrapper">
        {/* Filters Top Bar */}
        <div className="dashboard-filters-bar">
          <div className="priority-filter-group">
            <span className="filter-label">Filter by priority</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="search-filter-group">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Columns Grid */}
        <div className="columns-grid">
          {/* TO DO Column */}
          <div className="column-container">
            <div className="column-header-bar todo-border-bottom">
              <div className="column-title-left">
                <span className="column-dot todo-bg-dot"></span>
                <span className="column-title-text todo-text-color">TO DO</span>
              </div>
              <span className="column-count-badge todo-badge-bg">{todoTasks.length}</span>
            </div>

            <div className="column-cards-list">
              {todoTasks.length > 0 ? (
                todoTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="empty-state-card">No tasks here</div>
              )}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="column-container">
            <div className="column-header-bar inprogress-border-bottom">
              <div className="column-title-left">
                <span className="column-dot inprogress-bg-dot"></span>
                <span className="column-title-text inprogress-text-color">IN PROGRESS</span>
              </div>
              <span className="column-count-badge inprogress-badge-bg">{inProgressTasks.length}</span>
            </div>

            <div className="column-cards-list">
              {inProgressTasks.length > 0 ? (
                inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="empty-state-card">No tasks here</div>
              )}
            </div>
          </div>

          {/* DONE Column */}
          <div className="column-container">
            <div className="column-header-bar done-border-bottom">
              <div className="column-title-left">
                <span className="column-dot done-bg-dot"></span>
                <span className="column-title-text done-text-color">DONE</span>
              </div>
              <span className="column-count-badge done-badge-bg">{doneTasks.length}</span>
            </div>

            <div className="column-cards-list">
              {doneTasks.length > 0 ? (
                doneTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="empty-state-card">No tasks here</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-content-wrapper {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .priority-filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .filter-select {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.8em;
          box-shadow: var(--shadow-sm);
        }

        .search-filter-group {
          position: relative;
          display: flex;
          align-items: center;
          width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.2rem;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-primary);
          outline: none;
          box-shadow: var(--shadow-sm);
        }

        .search-input:focus {
          border-color: var(--primary);
        }

        .columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }

        .column-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .column-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid transparent;
        }

        .column-title-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .column-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .column-title-text {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .column-count-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* Color classes */
        .todo-border-bottom {
          border-color: var(--todo-color);
        }
        .todo-bg-dot {
          background-color: var(--todo-color);
        }
        .todo-text-color {
          color: var(--todo-color);
        }
        .todo-badge-bg {
          background-color: var(--todo-color);
        }

        .inprogress-border-bottom {
          border-color: var(--inprogress-color);
        }
        .inprogress-bg-dot {
          background-color: var(--inprogress-color);
        }
        .inprogress-text-color {
          color: var(--inprogress-color);
        }
        .inprogress-badge-bg {
          background-color: var(--inprogress-color);
        }

        .done-border-bottom {
          border-color: var(--done-color);
        }
        .done-bg-dot {
          background-color: var(--done-color);
        }
        .done-text-color {
          color: var(--done-color);
        }
        .done-badge-bg {
          background-color: var(--done-color);
        }

        .column-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 400px;
        }

        .empty-state-card {
          background-color: white;
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .columns-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </AppLayout>
  );
};

export default Dashboard;
