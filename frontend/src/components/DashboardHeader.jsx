import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h2 className="text-3xl font-bold text-center">Vox Radio Presenters Dashboard</h2>
          <p className="text-center mt-2 text-orange-100">Real-time updates and management tools</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;