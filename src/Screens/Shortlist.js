import React from 'react'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Checkbox, FormControlLabel, Typography, Card, CardContent, Container } from '@mui/material';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
// Footer
const Shortlist = () => {
    const [placed, setPlaced] = useState([]);
    const authToken = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await fetch(process.env.REACT_APP_API_URL + `stu/appStu/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': authToken,
              },
            });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPlaced(data.students_placed);
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
        fetchStudents();
      }, [id, authToken]);
  return (
    
    <div>
    <Navbar/>
    <Card className="bg-gray-800">
    <CardContent>
      <Typography variant="h4" component="h4" className="mb-4">
        Placed Students
      </Typography>
      <ul className="list-none">
        {placed.map((student) => (
          <li key={student._id} className="bg-gray-800 p-4 mb-2 rounded shadow-lg">
            <Typography className="text-white">
              {student.username}
            </Typography>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
  <Footer/>
    </div>
  )
}

export default Shortlist