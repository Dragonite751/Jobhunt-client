import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const onSubmit = async (data) => {
    setServerError(null);
    const response = await fetch(process.env.REACT_APP_API_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.Email,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
    try {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }
      const resp = await response.json();
      console.log(resp);
      if (resp.success) {
        document.cookie = "authCookie=" + resp.token;
        localStorage.setItem("authToken", resp.token);
        console.log(resp.student.firstLogin);
      
        localStorage.setItem("role", resp.student.role);
        console.log('====================================');
        console.log(resp.student.role);
        console.log('====================================');
        if (resp.student.firstLogin && resp.student.role === "student") {
          navigate("/info");
        }
        else {
          navigate("/");
        }
      }
      else {
        alert(resp.message)
      }
      console.log('User signed up successfully', await response.json());
    } catch (error) {
      setServerError(error.message);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md items-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register('Email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@student.nitw\.ac\.in$/,
                    message: 'Email must end with @nitw.ac.in',
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
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
              <input
                type="submit"
                value="Login"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {serverError && <p className="text-red-500 text-sm mt-4">{serverError}</p>}

          </form>
          <Link to="/signup">
          <h6 className='text-blue-700 text-center mt-3'>Don't have an account? Sign up here</h6>          
        </Link>
        </div>
      </div>
    </>
  )
}

export default Login;