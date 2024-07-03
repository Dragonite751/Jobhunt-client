import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, Typography, Link } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().replace('Z', '.000');
};
const AnnouncementCard = ({ anns, user, onPostCompleted }) => {
  const authToken = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handlePost = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/stu/comApply/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'authorization': authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLoading(false);
      alert("Application posted");
      onPostCompleted();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <CircularProgress />
        <p className="mt-2">This may take a long time, please be patient.</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="companno space-y-8 p-6 bg-gray-100">
        {anns.map((i) => (
          <Card key={i._id} className="shadow-lg rounded-lg p-6 bg-white border border-gray-300">
            <CardHeader
              title={i.company_name}
              className="font-bold text-xl bg-blue-500 text-white p-4 rounded-t-lg"
            />
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <div>
                  <Typography variant="body1" className="mb-2">
                    <b>Offer type:</b> {i.offer_type}
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <b>Eligible branches:</b> {i.eligible_branches}
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <b>Eligibility criteria:</b> {i.eligibility_criteria}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" className="mb-2">
                    <b>Job title:</b> {i.job_title}
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <b>Salary:</b> {i.salary}
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <b>Deadline:</b> {new Date(i.deadline).toLocaleDateString()}
                  
                  </Typography>
                </div>
              </div>
              <div className="mt-4">
                <Typography variant="body1" className="mb-2">
                  <b>Job description:</b> <Link href={i.jd} style={{ color: 'black' }}>Job Description Link</Link>
                </Typography>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {user === "student" && (
                  i.deadline > formatDate(Date.now()) ? (
                    <Button
                      variant="contained"
                      onClick={() => handlePost(i._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      Apply
                    </Button>
                  ) : (
                    <div>
                      <Button
                        variant="contained"
                        className="bg-gray-500 text-white"
                        onClick={() => Navigate(`shortlist/${i._id}`)}
                      >
                        Shortlist
                      </Button>
                    </div>
                  )
                )}
                {user === "tnp" && (
                  <Button
                    variant="contained"
                    onClick={() => Navigate(`appStu/${i._id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white"
                  >
                    Applied students
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default AnnouncementCard;
