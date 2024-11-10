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
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer limit={3} theme='light' />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
