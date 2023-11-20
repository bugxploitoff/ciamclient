"use client"
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import Nav from '../../components/Nav';

const Page = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [formData, setFormData] = useState({
    containerId: '',
    ostype: '',
    userid: '',
    password: '',
    session: Cookies.get('sessions')
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/addcontainer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle API response here
        // For example, show a success message
        toast.success('Docker setting up please check management portal', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        // Handle error here
        toast.success('Docker setting up please check management portal', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  // Check if the session cookie exists
  useEffect(() => {
    const sessionCookie = Cookies.get('sessions');
    if (!sessionCookie) {
      window.location.href = '/auth'; // Redirect to login if session cookie doesn't exist
    } else {
      // Send the session to API for verification
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: sessionCookie }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === 'success' ) {
            setIsSessionValid(true); // Set session validity
          } else {
            // Redirect to login and show session expired message
            toast.error('Session expired. Please log in again.', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            window.location.href = '/auth';
          }
        })
        .catch((error) => {
          window.location.href = '/auth';
        });
    }
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isSessionValid ? <Nav /> : null}
      {isSessionValid ? (
        <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0">
          <form onSubmit={handleSubmit}>
          <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="containerId" value={formData.containerId} onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Container Id</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="userid" value={formData.userid} onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Id</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
  <select
     name="ostype" value={formData.ostype} onChange={handleInputChange}
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    required
  >
    <option value="">Select os</option>
    <option value="ubuntu">Ubuntu</option>
    <option value="debian">Debian</option>
    <option value="arch">arch</option>
    <option value="windows">Windows</option>
  </select>
  <label
    htmlFor="floating_last_name"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    OS TYPE
  </label>
</div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-60 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <ToastContainer />
    </main>
  );
};

export default Page;
