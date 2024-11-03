import React from 'react';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Home />},
        {path: "/cart", element: <Cart />},
        {path: "/order", element: <Order />},
        {path: "/signIn", element: <SignIn />},
        {path: "/signUp", element: <SignUp />}
      ]
    }
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
