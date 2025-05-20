import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import Home from './routes/Home';
import AdminLayout from './layouts/AdminLayout';
import AdminQuestions from './routes/admin/Questions';
import QuizLayout from './layouts/QuizLayout';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';
import Cats from './routes/Cats';
import AdminHome from './routes/admin/AdminHome';
import AdminCats from './routes/admin/AdminCats';
import Levels from './routes/Levels';
import AdminQuests from './routes/admin/AdminQuests';
import Quiz from './routes/Quiz';
import QuizResult from './routes/QuizResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'cats',
        element: <Cats />,
      },
      {
        path: 'levels',
        element: <Levels />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'results',
        element: <QuizResult />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      {
        path: 'cats',
        element: <AdminCats />,
      },
      {
        path: 'quests',
        element: <AdminQuests />,
      },
      { path: 'questions', element: <AdminQuestions /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
