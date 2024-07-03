import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const password = watch('password');
 
  const onSubmit = async (data) => {
    setServerError(null); 

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "auth/createStudent", {
        method: 'POST',
        body: JSON.stringify({
          email: data.Email,
          password: data.password,
          password1: data.password1,
          rollno: data.rollno,
          role: data.role,
          username: data.username
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }
      const resp = await response.json();
      console.log(resp.token);
      if (resp.success) {
        document.cookie = "authCookie=" + resp.token;
        localStorage.setItem("authToken", resp.token)
        navigate("/login");
      } else {
        alert(resp.message)
      }
      console.log('User signed up successfully', await response.json());
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('Email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@student.nitw\.ac\.in$/,
                  message: 'Email must end with @student.nitw.ac.in',
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('username', {
                required: 'Username is required'
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                maxLength: { value: 12, message: 'Password must be less than 12 characters' },
                minLength: { value: 5, message: 'Password must be at least 5 characters' },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register('password1', {
                required: 'Confirm Password is required',
                maxLength: { value: 12, message: 'Confirm Password must be less than 12 characters' },
                minLength: { value: 5, message: 'Confirm Password must be at least 5 characters' },
                validate: value => value === password || 'Passwords do not match',
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password1 && <p className="text-red-500 text-sm mt-1">{errors.password1.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Roll Number</label>
            <input
              type="text"
              {...register('rollno', {
                required: 'Roll number is required',
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.rollno && <p className="text-red-500 text-sm mt-1">{errors.rollno.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              {...register('role')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">student</option>
              <option value="tnp">TnP</option>
            </select>
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {serverError && <p className="text-red-500 text-sm mt-4">{serverError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
