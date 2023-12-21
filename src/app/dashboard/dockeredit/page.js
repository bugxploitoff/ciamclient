"use client"
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import Nav from '@/app/components/Nav';
const Page = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const pageParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('query') : null;

  

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
          if (responseData.status === 'success') {
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
          console.error('Session verification failed:', error);
          window.location.href = '/auth';
        });
    }
    
  }, []);
  const [formData, setFormData] = useState({
    containerId: '',
    dockerId: '',
    accessPassword: '',
    userRole: 'root',
    session: Cookies.get('sessions')
  });

  useEffect(() => {
    // Fetch user data based on regno (assuming it's the correct parameter name)
    if (pageParam) {
      fetch('http://ec2-3-17-74-205.us-east-2.compute.amazonaws.com:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ container: pageParam,  auth: sessionStorage }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === 'Success') {
          
          setFormData(responseData);
          toast.success("user found", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (responseData.status === 'nouser') {
          toast.error("user not found", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("something went wrong", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error("501 internal server error", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
  }, [pageParam]); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.pwnme.in/gym/updateuser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.status === 'success') {
          toast.success(responseData.message, {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(responseData.message, {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error('501 internal server error', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('501 internal server error', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // SWR Hook to fetch data
  useSWR('', handleSubmit);
    

  return (
    <div>
      {isSessionValid ? 
       <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <ToastContainer/>
     <Nav />

     <div >

     <form onSubmit={handleSubmit}>
          <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="containerId" value={formData.containerId} onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Container Id</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="dockerId" value={formData.dockerId} onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Docker Id</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="password" name="accessPassword" value={formData.accessPassword} onChange={handleInputChange} id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Access password</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
  <select
     name="userRole" value={formData.userRole} onChange={handleInputChange}
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    required
  >
    <option value="root">root</option>
    <option value="user">user</option>
    <option value="guest">guest</option>
  </select>
  <label
    htmlFor="floating_last_name"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    User Role
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

     <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0  lg:text-center">
     </div>
   </main>
       : null}
      <ToastContainer />
    </div>
  );
};

export default Page;
