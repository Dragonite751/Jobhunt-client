import React, { useEffect, useState } from 'react';
import JobCard from '../Components/Jobcard';
import { useAuth } from '../context/authContext';
import Navbar from '../Components/Navbar';
// Navbar
const Offcampus = () => {
  const { authToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ranks, setRanks] = useState([]);
  // const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (authToken) {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+'stu/getjob', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'authorization':authToken,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data1 = await response.json();
        setJobs(data1.jobs);
        setRanks(data1.jobs.ranks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }}
    };
    fetchCompanyData();
  }, [authToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {jobs.job_info && jobs.job_info.map((job, index) => (
      <JobCard ind={index} job={job} ranks={ranks} />
      ))}
      </div>
      </>
  );
};

export default Offcampus;
