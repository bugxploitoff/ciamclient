"use client";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Cookies from 'js-cookie';
import Nav from '@/app/components/Nav';

const Page = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const sessionCookie = Cookies.get('sessions');
    if (!sessionCookie) {
      window.location.href = '/auth'; // Redirect to login if session cookie doesn't exist
    } else {
    fetch('http://localhost:5000/viewapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: sessionCookie }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setStudentList(data.data); // Set the student list with fetched data
        }
      })
      .catch((error) => {
        console.error('Error fetching Docker data:', error);
      });
    }
  }, []);


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
          console.error('Session verification failed:', error);
          window.location.href = '/auth';
        });
    }
  }, []);

  const handleFoodClick = (foodCategory) => {
    setRedirectPath(`dockeredit?query=${encodeURIComponent(foodCategory)}`);
  };

  useEffect(() => {
    let redirectTimeout;
    if (redirectPath) {
      redirectTimeout = setTimeout(() => {
        // Redirect to the desired path
        window.location.href = redirectPath;
      }); // Redirect after 5 seconds
    }
  
    return () => clearTimeout(redirectTimeout); // Clean up the timeout when unmounting
  }, [redirectPath]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      const encodedQuery = encodeURIComponent(searchQuery);
      setRedirectPath(`dockeredit?query=${encodedQuery}`);
    }
  };
  useEffect(() => {
    let redirectTimeout;
    if (redirectPath) {
      redirectTimeout = setTimeout(() => {
        // Redirect to the desired path with the search query
        window.location.href = redirectPath;
      }, 5000); // Redirect after 5 seconds
    }
  }, [redirectPath]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isSessionValid ? (
       <Nav />
      ) : null}
      {isSessionValid ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center">
<div className="p-5 border"> 
<form onSubmit={(e) => handleSearchSubmit(e)}>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Docker container id"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>
{studentList.map((student) => (
            <div
              key={student}
              className="cursor-pointer select-none space-y-2 rounded-sm bg-[#f2f3f5] p-4 dark:bg-[#2b2d31] shadow-xl"
              onClick={() => handleFoodClick(student)}
            >
              <div className="flex items-center justify-between gap-16">
                <div className="flex items-center gap-4">
                  <img
                    src="/docker.svg"
                    alt="docker"
                    className="h-14 w-14 rounded-xl"
                    draggable="false"
                  />
                  <div>
                    <h1 className="font-normal text-[#060607] dark:text-white">{student}</h1>
                  </div>
                </div>
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <ToastContainer />
    </main>
  );
};

export default Page;