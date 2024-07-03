import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Navbar from '../Components/Navbar';
// Navbar
const CompanyForm = () => {
    const navigate = useNavigate();
    const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        setServerError(null);
        console.log(authToken);
        console.log(data);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"stu/comPost", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    company_name: data.company_name,
                    offer_type: data.offer_type,
                    eligible_branches: data.eligible_branches,
                    eligibility_criteria: data.eligibility_criteria,
                    job_title: data.job_title,
                    salary: data.salary,
                    deadline: data.deadline,
                    jd: data.jd,
                    spoc: data.spoc
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': authToken
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add information');
            }
            alert("Information posted");
            navigate("/");
        } catch (error) {
            setServerError(error.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Company Information</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Company Name</label>
                            <input
                                type="text"
                                {...register('company_name', { required: 'Company name is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Offer Type</label>
                            <input
                                type="text"
                                {...register('offer_type', { required: 'Offer type is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.offer_type && <p className="text-red-500 text-sm mt-1">{errors.offer_type.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Eligible Branches</label>
                            <input
                                type="text"
                                {...register('eligible_branches', { required: 'Eligible branches are required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.eligible_branches && <p className="text-red-500 text-sm mt-1">{errors.eligible_branches.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Eligibility Criteria</label>
                            <input
                                type="text"
                                {...register('eligibility_criteria', { required: 'Eligibility criteria is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.eligibility_criteria && <p className="text-red-500 text-sm mt-1">{errors.eligibility_criteria.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Job Title</label>
                            <input
                                type="text"
                                {...register('job_title', { required: 'Job title is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.job_title && <p className="text-red-500 text-sm mt-1">{errors.job_title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Salary</label>
                            <input
                                type="text"
                                {...register('salary', { required: 'Salary is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Application Deadline</label>
                            <input
                                type="date"
                                {...register('deadline', { required: 'Application deadline is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Job Description (JD)</label>
                            <textarea
                                {...register('jd')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">SPOC (Student Point of Contact)</label>
                            <input
                                type="text"
                                {...register('spoc', { required: 'SPOC is required' })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.spoc && <p className="text-red-500 text-sm mt-1">{errors.spoc.message}</p>}
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
        </div>
    );
}

export default CompanyForm;
