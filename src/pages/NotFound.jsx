import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const NotFound = () => {
  return (
    <AppLayout>
      <div className="notfound-page-container animate-fade-in">
        <div className="notfound-form-card">
          <div className="notfound-error-code">404</div>
          <h1 className="notfound-title">Page not found</h1>
          <p className="notfound-subtitle">
            The page you are looking for does not exist or was moved.
          </p>

          <Link to="/dashboard" className="btn btn-notfound-home">
            Back to dashboard
          </Link>
        </div>
      </div>

      <style>{`
        .notfound-page-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2.5rem;
          min-height: calc(100vh - 80px);
        }

        .notfound-form-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 3.5rem 2.5rem;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
          text-align: center;
        }

        .notfound-error-code {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .notfound-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .notfound-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .btn-notfound-home {
          background-color: var(--primary);
          color: white;
          width: 100%;
          height: 40px;
          font-weight: 600;
        }

        .btn-notfound-home:hover {
          background-color: var(--primary-hover);
        }
      `}</style>
    </AppLayout>
  );
};

export default NotFound;
