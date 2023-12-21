"use client";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import Nav from '../../components/Nav';

const Page = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null); 

  // Check if the session cookie exists
  useEffect(() => {
    const sessionCookie = Cookies.get('sessions');
    if (!sessionCookie) {
      window.location.href = '/auth'; // Redirect to login if session cookie doesn't exist
    } else {
        console.log(sessionCookie);
      // Send the session to API for verification
      fetch('http://ec2-3-17-74-205.us-east-2.compute.amazonaws.com:5000/', {
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

  const handleFoodClick = (foodCategory) => {
    const newPath = `/dashboard/${foodCategory}`;
    window.location.href = newPath;
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isSessionValid ? (
       <Nav />
      ) : null}
      {isSessionValid ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-center">
         
          {/* Snack */}
          <div
            className="cursor-pointer select-none space-y-2 rounded-sm bg-[#f2f3f5] p-4 dark:bg-[#2b2d31] shadow-xl"
            onClick={() => handleFoodClick('addapi')}
          >
            <div className="flex items-center justify-between gap-16">
              <div className="flex items-center gap-4">
                <img
                  src="/add.svg"
                  alt="mor"
                  className="h-14 w-14 rounded-xl"Manage
                  draggable="false"
                />
                <div>
                  <h1 className="font-normal text-[#060607] dark:text-white">Add Container</h1>
                </div>
              </div>
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>

</div>
          </div>
          <br />
          {/* Dinner */}
          <div
            className="cursor-pointer select-none space-y-2 rounded-sm bg-[#f2f3f5] p-4 dark:bg-[#2b2d31] shadow-xl"
            onClick={() => handleFoodClick('mngapi')}
          >
            <div className="flex items-center justify-between gap-16">
              <div className="flex items-center gap-4">
                <img
                  src="/mag.svg"
                  alt="nig"
                  className="h-14 w-14 rounded-xl"
                  draggable="false"
                />
                <div>
                  <h1 className="font-normal text-[#060607] dark:text-white">Manage Container</h1>
                </div>
              </div>
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>
</div>
          </div>
          <br />
          {/* Dinner */}
          <div
            className="cursor-pointer select-none space-y-2 rounded-sm bg-[#f2f3f5] p-4 dark:bg-[#2b2d31] shadow-xl"
            onClick={() => handleFoodClick('delapi')}
          >
            <div className="flex items-center justify-between gap-16">
              <div className="flex items-center gap-4">
                <img
                  src="/del.svg"
                  alt="nig"
                  className="h-14 w-14 rounded-xl"
                  draggable="false"
                />
                <div>
                  <h1 className="font-normal text-[#060607] dark:text-white">Delete Container</h1>
                </div>
              </div>
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>
</div>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </main>
  );
};

export default Page;
