import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Checkbox, FormControlLabel, Typography, Card, CardContent, Container } from '@mui/material';
import Navbar from '../Components/Navbar';
// Navbar
const ApplicantsList = () => {
  const { register, handleSubmit } = useForm();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem('authToken');
  const [serverError, setServerError] = useState(null);
  const [placed, setPlaced] = useState([]);
  const { id } = useParams();
  const [trigger, setTrigger] = useState(false);

  const toggle = () => {
    setTrigger(!trigger);
  };

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
        setStudents(data.students_applied);
        setPlaced(data.students_placed);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchStudents();
  }, [id, authToken, trigger]);

  const onSubmit = async (formData) => {
    setServerError(null);
    let shortlisted;
    if (Array.isArray(formData.shortlisted)) {
      shortlisted = formData.shortlisted;
    } else {
      shortlisted = [formData.shortlisted];
    }

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'stu/shortlist', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          companyId: id,
          students: shortlisted,
        }),
        headers: {
          'Content-Type': 'application/json',
          'authorization': authToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to shortlist students');
      }

      const resp = await response.json();
      toggle();
      console.log(resp);
    } catch (error) {
      setServerError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularProgress />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto mt-4">
          <Typography variant="h4" component="h1" className="text-center mb-8">
            Applicants List
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card className="bg-gray-800 mb-4">
                <CardContent>
                  <Typography variant="h5" component="h2" className="mb-4">
                    Applied Students
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ul className="list-none">
                      {students.map((student) => (
                        <li key={student._id} className="mb-2">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="shortlisted"
                                value={student._id}
                                {...register('shortlisted')}
                                className="text-green-400 bg-blue-900"
                              />
                            }
                            label={
                              <a href={`/profile/${student._id}`} className="text-blue-400 hover:underline">
                                {student.username}
                              </a>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="mt-4 w-full"
                    >
                      Shortlist Selected
                    </Button>
                    {serverError && <Typography color="error" className="mt-4">{serverError}</Typography>}
                  </form>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-gray-800">
                <CardContent>
                  <Typography variant="h5" component="h2" className="mb-4">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantsList;
