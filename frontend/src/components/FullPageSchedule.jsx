import React, { useState } from 'react';
import { ArrowLeft, Calendar, Download, Printer } from 'lucide-react';
import { Button } from './ui/button';
import VoxRadioProgramLog from './VoxRadioProgramLog';

const FullPageSchedule = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-white hover:text-orange-200 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="h-8 w-px bg-orange-300"></div>
              
              <div className="flex items-center space-x-3">
                <Calendar size={24} />
                <div>
                  <h1 className="text-2xl font-bold">VOX Radio Program Schedule</h1>
                  <p className="text-orange-100">Complete weekly programming guide</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Printer size={16} className="mr-2" />
                Print Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <EnhancedProgramSchedule isFullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default FullPageSchedule;