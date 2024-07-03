import React from 'react';
import ProfileCard from './Profilecard';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const DownloadPdf = ({ buffer }) => {
  const navigate = useNavigate();
  const downloadPdf = () => {
    const byteArray = new Uint8Array(buffer);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
    <Button variant="contained" color="primary" onClick={downloadPdf}>
    Download PDF
    </Button>
    <Button variant="contained" color="primary" onClick={() => navigate("/addresume")}>
    Upload new resume
    </Button>

    </div>
  );
};

const Resume = ({ pinfo, info, skills, data, resume }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <header className="text-black p-4 text-center">
        <h1 className="text-3xl font-bold">Candidate Profile</h1>
      </header>

      <Container className="max-w-3xl my-6 p-6 bg-white shadow-lg rounded-lg">
        <Box className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h5" className="font-bold">Name: {pinfo.username}</Typography>
            <Typography variant="body1">Aspiring job role: {info.designation}</Typography>
            <Typography variant="body1">Preferred job location: {info.work_place}</Typography>
            <Typography variant="body1">Email: {pinfo.email}</Typography>
            <Typography variant="body1">CGPA: {info.cgpa}</Typography>
            <Typography variant="body1">Branch: {info.branch}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate("/info")}
            >
              Edit profile
            </Button>
          </div>
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            alt="Candidate"
            className="w-36 h-36 rounded-full border-4 border-gray-800"
          />
        </Box>
        <hr />

        <Box className="mb-6">
          <Typography variant="h6" className="font-bold border-b-2 border-gray-800">Skills</Typography>
          <ul className="list-disc pl-5 mt-2">
            {skills.map((skill, index) => (
              <li key={index} className="mb-2">{skill}</li>
            ))}
          </ul>
        </Box>
        <hr />

        <Box className="mb-6">
          <Typography variant="h6" className="font-bold">Resume</Typography>
          {resume ? (
            <DownloadPdf buffer={resume} />
          ) : (
            <Box className="flex justify-center items-center mt-4">
              <CircularProgress />
              <Typography variant="body1" className="ml-4">Loading...</Typography>
            </Box>
          )}
        </Box>
        <hr />

        <Box className="flex justify-around flex-wrap mb-6">
          {data && data.codechef !== "username not provided" && (
            <ProfileCard
              platform="Codechef"
              logo="https://cdn-1.webcatalog.io/catalog/codechef/codechef-icon-filled-256.png?v=1675596522631"
              profile={data.codechef}
              link={`https://www.codechef.com/users/${data.codechef.username}`}
            />
          )}
          {data && data.leetcode !== "username not provided" && (
            <ProfileCard
              platform="Leetcode"
              logo="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
              profile={data.leetcode}
              link={`https://leetcode.com/${data.leetcode.username}/`}
            />
          )}
          {data && data.codeforces !== "username not provided" && (
            <ProfileCard
              platform="Codeforces"
              logo="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png"
              profile={data.codeforces}
              link={`https://codeforces.com/profile/${data.codeforces.username}`}
            />
          )}
          {data && data.gfg !== "username not provided" && (
            <ProfileCard
              platform="GeeksforGeeks"
              logo="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"
              profile={data.gfg}
              link={`https://auth.geeksforgeeks.org/user/${data.gfg.username}/?utm_source=geeksforgeeks`}
            />
          )}
        </Box>
        <hr />

        <Box className="text-center mb-8">
          <Typography variant="h6" className="font-bold">GitHub</Typography>
          <img
            className="mx-auto my-4"
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            alt="GitHub"
            style={{ height: '100px', width: '100px' }}
          />
          <Typography variant="h6" className="font-semibold">Repositories</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {data.github !== "User not found" && data.github.repos && data.github.repos.length > 0 && (
              data.github.repos.map((repo, index) => (
                <Box key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                  <Typography variant="h6" className="font-bold mb-2">{repo.name}</Typography>
                  <Typography variant="body2" className="text-gray-700 mb-2">Forks: {repo.forks}</Typography>
                  <Box className="flex justify-between items-center">
                    <Typography variant="body2" className="text-gray-500">Language: {repo.language}</Typography>
                    <a href={repo.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      View Repository
                    </a>
                  </Box>
                </Box>
              ))
            )}
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Resume;
