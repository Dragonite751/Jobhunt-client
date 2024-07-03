import React, { useEffect } from 'react'
import AnnouncementCard from '../Components/Announcement';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/authContext';
import Navbar from '../Components/Navbar';
// Navbar
// useAuth
const Companies = () => {
    const [companies, setcompanies] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postCompleted, setPostCompleted] = useState(false);
    const { authToken } = useAuth();
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (authToken) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'stu/comps', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': authToken, 
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data1 = await response.json();
            setcompanies(data1); 
            setLoading(false);
            
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }}
    };
    fetchCompanyData();
},[postCompleted,authToken]);
const handlePostCompleted = () => {
    setPostCompleted(!postCompleted);
  };
console.log(companies);
if (loading) return <div>
<CircularProgress />
<p>This may take a long time you must have the patience to view your stats</p>
</div>;
if (error) return <div>Error: {error}</div>;
  return (
    <div>
    <Navbar/>
    <AnnouncementCard anns={companies.comps} user={companies.role} onPostCompleted={handlePostCompleted}/>
    </div>
  )
}
export default Companies;