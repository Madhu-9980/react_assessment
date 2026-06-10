
## Task Manager Application

Task Flow is a secure, responsive, and intuitive task management web application designed to help teams track, organize, and transition tasks through a structured workflow pipeline. Built using **React (Vite)**, **React Router**, and **Vanilla CSS** with a modern, clean light-grey design and a dark sidebar layout.

## Key Features

*   **Secure Authentication**: Integrated with a live AWS sign-in endpoint. Logs sessions via JSON Web Tokens (JWT) stored securely in `localStorage`.
*   **Pipeline Columns**: Structured into three distinct workflows (**To Do**, **In Progress**, and **Done**) with dynamic count badges, color-coded status indicators, and column border themes.
*   **Inline Transitions**: Dropdown selector in each card allowing users to shift task columns instantly from the dashboard.
*   **Quick Deletion**: Inline light-red delete buttons to remove tasks directly from active pipelines.
*   **Task Details**: A dedicated view showing the unabbreviated description, creation dates, deadlines, and a complete auditing history of status transitions.
*   **Custom Task Modal**: A creation form with full input constraint validation (title limits $\le$ 50 chars, description limits $\le$ 200 chars, and strict future-deadline selections).
*   **Route Protection**: Wrapper route guards (`ProtectedRoute` and `PublicRoute`) checking for the presence of session tokens.
*   **Persistent Cache**: Active tasks are serialized and synced to local storage to maintain persistence across page reloads.
*   **Environment Configuration**: Stores base API endpoints inside environment variables to prevent credentials leaks.



##  Project Structure


├── dist/                  # Production build folder
├── public/                # Static public assets
└── src/
    ├── assets/            # App icons and media assets
    ├── components/        # Reusable UI widgets and guards
    │   ├── AddTaskModal.jsx   # Input validated modal
    │   ├── AppLayout.jsx      # Unified layout with dark sidebar
    │   ├── ProtectedRoute.jsx # Guard for private dashboard paths
    │   ├── PublicRoute.jsx    # Guard to prevent login access when auth'd
    │   └── TaskCard.jsx       # Individual card with dropdowns & delete
    ├── context/           # React Context Providers
    │   ├── AuthContext.jsx    # Context managing API login/logout
    │   └── TaskContext.jsx    # Context managing task states & local storage
    ├── pages/             # Route-level page layouts
    │   ├── Dashboard.jsx      # Main pipeline dashboard
    │   ├── Login.jsx          # Split-screen credentials form
    │   ├── NotFound.jsx       # Custom 404 page
    │   └── TaskDetail.jsx     # Detail overview and timeline history
    ├── App.css            # Scaffolding styles cleanup
    ├── App.jsx            # Routing and provider wrappers
    ├── index.css          # Global CSS design system variables
    └── main.jsx           # App entry point
├── .env                   # Environment configurations
├── index.html             # Main HTML entry with Google Fonts
└── package.json           # Scripts and dependencies

##  Tech Stack

*   **Frontend Library**: React
*   **Build Tool**: Vite
*   **Routing**: React Router Dom

## ⚙️ Installation and Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Clone the Repository

git clone 
cd react_assessment


### 3. Install Dependencies

npm install


### 4. Setup Environment Variables
Create a `.env` file in the root directory:
env
VITE_API_BASE_URL=https://csyibgv5y0.execute-api.eu-north-1.amazonaws.com/api


### 5. Run the Local Development Server
npm run dev

Open **http://localhost:5173** in browser to view the application.

### 6. Build for Production
To bundle the assets for deployment:

npm run build



