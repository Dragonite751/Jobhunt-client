import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


// useAuth
const AddInfoForm = () => {
  const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const work_places = [
    'Kochi', 'Bhubaneswar', 'Mumbai', 'Pune', 'Chennai', 'Delhi', 'Kolkata', 'Jaipur',
    'Ahmedabad', 'Hyderabad', 'Bangalore', 'Noida', 'Gurgaon', 'Nagpur', 'Lucknow'
  ];
  const job_titles = [
    'Analyst', 'Assistant Manager Supply Chain', 'Associate Analyst', 'Associate Software Engineer',
    'AUT - Assistant Under Training', 'Business Analyst', 'Business Development Manager', 'Consultant',
    'Developer Associate', 'Engineer Trainee', 'Field Engineer', 'Financial Analyst', 'Graduate Engineer Trainee (Get)',
    'Graduate Trainee', 'Internship Trainee', 'Java Developer', 'Management Trainee', 'Managing Director',
    'Post Graduate Engineer Trainee', 'Mechanical Engineer', 'Software Developer', 'System Engineer',
    'System Engineer Hardware', 'Technical Lead', 'Project Engineer', 'R&D Engineer', 'Sde1',
    'Software Analyst', 'Trainee Decision Scientist'
  ];
  const roles = ['INTERN', 'FULLTIME'];
  const degrees = ['Btech', 'MCA', 'Mtech'];
  const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Chemical', 'Civil', 'Metallurgy', 'Biotechnology'];

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(process.env.REACT_APP_API_URL+"stu/getInfo", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': authToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        if (data.firstLogin === false){
          setIsFirstLogin(false);
          Object.keys(data.info).forEach(key => {
            setValue(key, data.info[key]);
          });
        }
        setLoading(false);
      } catch (error) {
        setServerError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    setServerError(null);
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch("http://localhost:3001/stu/addInfo", {
        method: 'POST',
        body: JSON.stringify({
          job_type: data.job_title,
          role: data.role,
          work_place: data.work_place,
          codechefUsername: data.codechefUsername,
          githubUsername: data.githubUsername,
          codeforcesUsername: data.codeforcesUsername,
          gfgUsername: data.gfgUsername,
          leetcodeUsername: data.leetcodeUsername,
          branch: data.branch,
          cgpa: data.cgpa,
          degree: data.degree
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'authorization': authToken
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add/update info');
      }

      alert("Information submitted successfully");
      console.log(isFirstLogin);
      if(isFirstLogin){
        navigate("/addresume")
    }
    else{
          navigate("/")
      }
     
    } catch (error) {
      setServerError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Degree</label>
              <select {...register('degree', { required: 'Degree is required' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Degree</option>
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
              {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Branch</label>
              <select {...register('branch', { required: 'Branch is required' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">CGPA</label>
              <input {...register('cgpa', { required: 'CGPA is required', pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid CGPA' } })} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.cgpa && <p className="text-red-500 text-sm mt-1">{errors.cgpa.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Work Place</label>
              <select {...register('work_place', { required: 'Work Place is required' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Work Place</option>
                {work_places.map(place => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>
              {errors.work_place && <p className="text-red-500 text-sm mt-1">{errors.work_place.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Job Title</label>
              <select {...register('job_title', { required: 'Job Title is required' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Job Title</option>
                {job_titles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
              {errors.job_title && <p className="text-red-500 text-sm mt-1">{errors.job_title.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <select {...register('role', { required: 'Role is required' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Codechef Username</label>
              <input {...register('codechefUsername')} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Github Username</label>
              <input {...register('githubUsername')} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Codeforces Username</label>
              <input {...register('codeforcesUsername')} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">GeeksforGeeks Username</label>
              <input {...register('gfgUsername')} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">LeetCode Username</label>
              <input {...register('leetcodeUsername')} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <input type="submit" value="Submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {serverError && <p className="text-red-500 text-sm mt-4">{serverError}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInfoForm;
