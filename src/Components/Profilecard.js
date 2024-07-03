// ProfileCard.js
import React from 'react';

const ProfileCard = ({ platform, logo, profile, link }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-72 text-center hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-xl font-bold mb-2">{platform}</h3>
    <img className="mx-auto my-4" src={logo} alt={`${platform} Logo`} style={{ height: '100px', width: '100px' }} />
    <div className="text-left">
      <h6 className="font-semibold"><b>Username:</b> {profile.username}</h6>
      {profile.rating && <h6 className="font-semibold"><b>Rating:</b> {profile.rating}</h6>}
      {profile.country_rank && <h6 className="font-semibold"><b>Country Rank:</b> {profile.country_rank}</h6>}
      {profile.global_rank && <h6 className="font-semibold"><b>Global Rank:</b> {profile.global_rank}</h6>}
      {profile.ranking && <h6 className="font-semibold"><b>Ranking:</b> {profile.ranking}</h6>}
      {profile.totalSolved && <h6 className="font-semibold"><b>Problems Solved:</b> {profile.totalSolved}</h6>}
      {profile.acceptanceRate && <h6 className="font-semibold"><b>Acceptance Rate:</b> {profile.acceptanceRate}</h6>}
      {profile.maxRating && <h6 className="font-semibold"><b>Max Rating:</b> {profile.maxRating}</h6>}
      {profile.institute_rank && <h6 className="font-semibold"><b>Institute Rank:</b> {profile.institute_rank}</h6>}
      {profile.total_no_of_problems && <h6 className="font-semibold"><b>Problems Solved:</b> {profile.total_no_of_problems}</h6>}
      {profile.coding_score && <h6 className="font-semibold"><b>Coding Score:</b> {profile.coding_score}</h6>}
    </div>
    <a href={link} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block hover:bg-blue-600 transition-colors duration-300">
      Visit profile
    </a>
  </div>
);

export default ProfileCard;
