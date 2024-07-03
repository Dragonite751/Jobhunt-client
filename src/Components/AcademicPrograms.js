import React from 'react';

const AcademicPrograms = () => {
  return (
    <div className="text-white bg-custom-blue  py-8 md:w-full">
      <div className="container ">
        <h3 className="text-2xl font-bold text-center mb-8">Academic Programs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-white rounded-lg shadow-lg">
            <thead className="bg-blue-900">
              <tr>
                <th className="px-4 py-2 text-left">Undergraduate</th>
                <th className="px-4 py-2 text-left">Integrated M.Sc</th>
                <th className="px-4 py-2 text-left">Others</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-700">
                <td className="px-4 py-2 border-t border-blue-600">Civil Engineering</td>
                <td className="px-4 py-2 border-t border-blue-600">Integrated M.Sc. Chemistry</td>
                <td className="px-4 py-2 border-t border-blue-600">MBA</td>
              </tr>
              <tr className="bg-blue-600">
                <td className="px-4 py-2 border-t border-blue-500">Electrical Engineering</td>
                <td className="px-4 py-2 border-t border-blue-500">Integrated M.Sc. Mathematics</td>
                <td className="px-4 py-2 border-t border-blue-500">Ph.D</td>
              </tr>
              <tr className="bg-blue-700">
                <td className="px-4 py-2 border-t border-blue-600">Mechanical Engineering</td>
                <td className="px-4 py-2 border-t border-blue-600">Integrated M.Sc. Physics</td>
                <td className="px-4 py-2 border-t border-blue-600">MCA</td>
              </tr>
              <tr className="bg-blue-600">
                <td className="px-4 py-2 border-t border-blue-500">Metallurgical and Materials Engineering</td>
                <td className="px-4 py-2 border-t border-blue-500"></td>
                <td className="px-4 py-2 border-t border-blue-500">M.Tech</td>
              </tr>
              <tr className="bg-blue-700">
                <td className="px-4 py-2 border-t border-blue-600">Computer Science and Engineering</td>
                <td className="px-4 py-2 border-t border-blue-600"></td>
                <td className="px-4 py-2 border-t border-blue-600"></td>
              </tr>
              <tr className="bg-blue-600">
                <td className="px-4 py-2 border-t border-blue-500">Chemical Engineering</td>
                <td className="px-4 py-2 border-t border-blue-500"></td>
                <td className="px-4 py-2 border-t border-blue-500"></td>
              </tr>
              <tr className="bg-blue-700">
                <td className="px-4 py-2 border-t border-blue-600">Biotechnology</td>
                <td className="px-4 py-2 border-t border-blue-600"></td>
                <td className="px-4 py-2 border-t border-blue-600"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicPrograms;
