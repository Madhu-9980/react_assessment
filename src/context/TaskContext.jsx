/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext(null);

const INITIAL_TASKS = [
  {
    id: 2,
    title: 'Brainstorming',
    description:
      "Brainstorming brings team members' diverse experience into play. Run timed ideation rounds, capture every idea without judgement, then cluster themes and vote on directions. Document assumptions, risks, and dependencies so the team can align on scope before detailed planning begins.",
    priority: 'low',
    status: 'todo',
    deadline: '2024-12-05',
    createdAt: '2024-12-01T08:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-01T08:00:00.000Z' }
    ]
  },
  {
    id: 1,
    title: 'Research',
    description:
      'User research helps you to create an optimal product for users. Plan interviews and contextual inquiry, synthesise findings into personas and journey maps, and translate insights into measurable problems. Share a concise readout with design and engineering so decisions stay grounded in evidence.',
    priority: 'high',
    status: 'todo',
    deadline: '2024-12-06',
    createdAt: '2024-12-01T09:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-01T09:00:00.000Z' }
    ]
  },
  {
    id: 3,
    title: 'Wireframes',
    description:
      'Low fidelity wireframes include the most basic content and visuals. Map primary flows, empty states, and error paths at grayscale fidelity before polishing UI. Annotate interactions and data requirements so developers can estimate effort and spot edge cases early in the lifecycle.',
    priority: 'high',
    status: 'todo',
    deadline: '2024-12-05',
    createdAt: '2024-12-01T10:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-01T10:00:00.000Z' }
    ]
  },
  {
    id: 4,
    title: 'Onboarding Illustrations',
    description:
      'Create engaging illustrations for the onboarding flow. Establish a consistent character style, export assets for light and dark themes, and coordinate with copy for pacing across screens. Deliver SVG or PNG sets with a simple usage guide for engineers implementing animations.',
    priority: 'low',
    status: 'inprogress',
    deadline: '2024-12-05',
    createdAt: '2024-12-02T11:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-02T11:00:00.000Z' },
      { status: 'inprogress', changedAt: '2024-12-03T14:30:00.000Z' }
    ]
  },
  {
    id: 5,
    title: 'Moodboard',
    description:
      'Build a visual moodboard for the new design direction. Collect typography, colour, photography, and spatial references that express the brand tone. Present rationale for each cluster and capture stakeholder feedback in a single source of truth the team can revisit during visual design.',
    priority: 'low',
    status: 'inprogress',
    deadline: '2024-12-06',
    createdAt: '2024-12-02T12:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-02T12:00:00.000Z' },
      { status: 'inprogress', changedAt: '2024-12-03T15:00:00.000Z' }
    ]
  },
  {
    id: 6,
    title: 'Mobile App Design',
    description:
      'Design the complete mobile app screens. Cover navigation patterns, accessibility targets, and responsive breakpoints. Hand off redlines, component specs, and prototype links so QA can validate flows against acceptance criteria before release candidates go to the store.',
    priority: 'medium',
    status: 'done',
    deadline: '2024-12-06',
    createdAt: '2024-12-03T09:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-03T09:00:00.000Z' },
      { status: 'inprogress', changedAt: '2024-12-04T10:00:00.000Z' },
      { status: 'done', changedAt: '2024-12-05T17:00:00.000Z' }
    ]
  },
  {
    id: 7,
    title: 'Design System',
    description:
      'It just needs to adapt the UI from what you did before. Audit existing components, define tokens for spacing and colour, and publish documentation with live examples. Set governance for contributions and versioning so product teams can ship consistently without reinventing patterns each sprint.',
    priority: 'medium',
    status: 'done',
    deadline: '2024-12-06',
    createdAt: '2024-12-03T10:00:00.000Z',
    statusHistory: [
      { status: 'todo', changedAt: '2024-12-03T10:00:00.000Z' },
      { status: 'inprogress', changedAt: '2024-12-04T11:00:00.000Z' },
      { status: 'done', changedAt: '2024-12-05T18:00:00.000Z' }
    ]
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const cachedTasks = localStorage.getItem('tasks');
      if (cachedTasks) {
        return JSON.parse(cachedTasks);
      }
    } catch (e) {
      console.error('Failed to parse cached tasks:', e);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const timestamp = new Date().toISOString();
    const taskStatus = taskData.status || 'todo';
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority,
      status: taskStatus,
      deadline: taskData.deadline,
      createdAt: timestamp,
      statusHistory: [{ status: taskStatus, changedAt: timestamp }],
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    return newTask;
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const timestamp = new Date().toISOString();
          const updatedHistory = [
            ...(task.statusHistory || []),
            { status: newStatus, changedAt: timestamp },
          ];
          return {
            ...task,
            status: newStatus,
            statusHistory: updatedHistory,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const getTaskById = (taskId) => {
    return tasks.find((task) => task.id === Number(taskId) || task.id === taskId);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
