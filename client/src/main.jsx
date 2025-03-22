import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Enquiry from './pages/Enquiry';
import Donation from './pages/Donate.jsx';
import Success from './pages/Success.jsx';

// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '/pets',
        element: <Pets />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'profiles/:userId',
        element: <Profile />,
      },
      {
        path: 'pets/:petId',
        element: <PetDetails />,
      },
      {
        path: 'pets/:petId/enquiry',
        element: <Enquiry />,
      },
      {
        path: 'donate',
        element: <Donation />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'success',
        element: <Success />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
