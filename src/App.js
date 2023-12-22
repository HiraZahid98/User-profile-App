import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from './components/Home';

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  let [userData, setUserData] = useState(null);
  let [profileView, setProfileView] = useState(null);
  let [getResponse, setGetResponse] = useState()
  const navigate = useNavigate();

  const sessionID = searchParams.get("session_id");
  useEffect(() => {
    const apiUrl = "https://100014.pythonanywhere.com/api/userinfo/";
    if (!sessionID) {
      const redirectUrl =
        "https://100014.pythonanywhere.com/?redirect_url=http://127.0.0.1:3000";
      if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
      }
    } else {
      async function fetchUserInfo() {
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: sessionID }),
          });

          const data = await response.json();
          setUserData(data);
          let user_name = data.userinfo.username;
          const user_id = data.userinfo.userID;
          handleSubmitProfile(user_name);
          handleGetProfile(user_name, user_id)
          if (
            data.message === "You are logged out, Please login and try again!!"
          ) {
            navigate("https://100014.pythonanywhere.com/en/?redirect_url=");
          } else {
            // navigate("src/components/Home.js");
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }

      fetchUserInfo();
    }
  }, []);
  //get api request
  const handleGetProfile = async (username, id) => {
    const formData = {
      Username: username,
      userID : id
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        "https://100097.pythonanywhere.com/getprofile",
        requestOptions
      );
      const responseData = await response.json();
      setGetResponse(responseData);
      
      console.log(responseData)
      if (response.ok) {
        // alert('Form submitted successfully');
      } else {
        // alert('Form submission failed');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  //user profile info api
  const handleSubmitProfile = async (username) => {
    const formData = {
      username: username,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        "https://100014.pythonanywhere.com/api/profile_view/",
        requestOptions
      );
      const responseData = await response.json();
      setProfileView(responseData);
      if (response.ok) {
        // alert('Form submitted successfully');
      } else {
        // alert('Form submission failed');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return getResponse && profileView && userData ? (
    <div>
  
      <Home userInfo={userData} profileView={profileView} getResponse={getResponse}/>
    </div>
  ) : (
    <Loader />
  );
};

export default App;


