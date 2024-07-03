import React, { useEffect, useState } from 'react';
import Resume from '../Components/Resume';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Navbar from '../Components/Navbar';
// Navbar
const Profiles = () => {
  const { authToken } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      let url;
      if (id) {
        url = `${process.env.REACT_APP_API_URL}stu/getProfile/${id}`;
      } else {
        url = `${process.env.REACT_APP_API_URL}stu/getProfile`;
      }

      if (authToken) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': ` ${authToken}`, 
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setProfileData(data.message);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [id, authToken]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        This may take a long time, you must have the patience to view your stats.
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  const data = {
    github: profileData.github,
    codechef: profileData.codechef,
    gfg: profileData.gfg,
    leetcode: profileData.leetcode,
    codeforces: profileData.codeforces
  };

  return (
    <div>
      <Navbar/>
      <Resume
        pinfo={profileData.pinfo}
        info={profileData.info}
        skills={profileData.skills}
        data={data}
        resume={profileData.resume.resume.data}
      />
    </div>
  );
};

export default Profiles;
