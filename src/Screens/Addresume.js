import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
// useAuth
const ResumeForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();
    const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();

    const onSubmit = async (data) =>{
        setServerError(null);
     
        console.log(authToken);
        const formData = new FormData();
        formData.append('resume', data.resume[0]);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"stu/addResume", {
                method: 'POST',
                body: formData,
                headers: {
                    'authorization': authToken
                }
            });
            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload resume');
            }
            alert("Resume uploaded successfully");
            navigate("/");
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Upload Resume</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label className="block text-gray-700">Resume</label>
                        <input
                            type="file"
                            {...register('resume', { required: 'Resume is required' })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                    {serverError && <p className="text-red-500 text-sm mt-2 text-center">{serverError}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResumeForm;
