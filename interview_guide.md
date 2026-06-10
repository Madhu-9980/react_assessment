# Task Manager Application - Interview Explanation Guide

This guide compiles the technical details, architecture decisions, and code implementation of the Task Manager Application. Use these talking points during your interview to explain the code cleanly and demonstrate professional competence.

---

## 1. Project Organization & Architecture

**How to explain:**
> *"I structured the application using a standard, clean React directory configuration that isolates state, pages, and components:*
> - *`src/context/`: Contains contexts for Auth and Tasks to avoid prop-drilling.*
> - *`src/components/`: Houses reusable components like `TaskCard` and `AddTaskModal`, as well as routing wrappers.*
> - *`src/pages/`: Stores top-level route views (`Login`, `Dashboard`, `TaskDetail`, `NotFound`).*
> - *`src/index.css`: Implements a cohesive design system in Vanilla CSS. It manages dark-slate sidebars, responsive columns, dynamic priority badges, and modal overlays using CSS custom variables instead of bloating the project with Tailwind utilities."*

---

## 2. Session & State Persistence (React Context API)

**How to explain:**
> *"I used React's Context API to coordinate user sessions and task data globally.
> 
> **Authentication Context (`AuthContext.jsx`):**
> - The context handles login async POST requests to the AWS sign-in endpoint.
> - On a successful request, it extracts the `token` and `user` payload (which the live API nests inside a `data` key) and saves the token in `localStorage` under `authToken` to maintain sessions across reloads.
> 
> **Task Pipeline Context (`TaskContext.jsx`):**
> - The context reads tasks from `localStorage` upon initial render.
> - If no cache is found, it automatically seeds the 7 initial tasks.
> - It exposes CRUD hooks (`addTask`, `updateTaskStatus`, `deleteTask`) to mutate the array state and synchronize serialization back to the browser storage."*

---

## 3. Higher-Order Wrapper Routing (Security)

**How to explain:**
> *"To restrict access to the dashboard and details pages, I implemented a wrapper guard pattern:
> - **`ProtectedRoute`**: Checks for `authToken` in local storage and redirects unauthorized requests back to `/login` using the `<Navigate />` router component.
> - **`PublicRoute`**: Redirects already logged-in users away from the login page straight to the dashboard to maintain a clean flow."*

---

## 4. UI Pipeline & Inline Interactions

**How to explain:**
> *"The layout reflects the specified designs:
> - **Columns**: Filtered dynamically by text query and priority tag, and divided into TO DO, IN PROGRESS, and DONE columns.
> - **Card Operations**: Users can modify status directly from the card using an inline select dropdown, which immediately updates the list state in context and shifts columns dynamically. I also added a light-red `Delete` button to remove tasks instantly.
> - **Form Validation**: The `AddTaskModal` requires a title (max 50 chars), a deadline (restricted using `min` dates to today or future dates), and supports custom status selection upon creation."*

---

## 5. Problem Solving & Real-world Debugging

**How to explain (Key highlight):**
> *"During implementation, I identified and fixed a mismatch between the API specification and the live endpoint:
> - The specification payload example used the key `username`, but the live endpoint returned errors unless the key was named `email`.
> - Additionally, successful authentications returned payload tokens nested inside a `data` property rather than at the root.
> - I resolved this by mapping the login inputs to the `email` key in the POST request body and adding a check that supports both root-level and nested response values, ensuring the application remains robust to backend changes."*
