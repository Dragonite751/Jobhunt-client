import React from 'react';  

const JobCard = ({ job,ind,ranks }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full sm:w-80 h-auto sm:h-80 m-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h5 className="text-2xl font-bold mb-2 text-gray-900">{job.employer_name}</h5>
    <h6 className="text-gray-700 mb-1"><b>Job title:</b> {job.job_title}</h6>
    <h6 className="text-gray-700 mb-1"><b>Job type:</b> {job.job_employment_type}</h6>
    <h6 className="text-gray-700 mb-1"><b>Work place:</b> {job.job_city}, {job.job_state}, {job.job_country}</h6>
    
    <h6 className="text-gray-700 mb-4"><b>Rating (resume):</b> {ranks[ind]}</h6>
    <a href={job.job_google_link} target="_blank" rel="noopener noreferrer">
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Apply
      </button>
    </a>
  </div>
);

export default JobCard;
