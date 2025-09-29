'use client';
import React, { useState } from 'react';

const StepOne = ({ data, onChange, onNext }: any) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.duration_seconds) {
      setError('Please select a time duration');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-900">Choose Time Duration</h2>

      <select
        className="w-full border p-2 rounded"
        value={data.duration_seconds || ''}
        onChange={(e) => {
          setError('');
          const value = Number(e.target.value);
          onChange('duration_seconds', value);
        }}
      >
        <option value="">Choose an option</option>
        <option value="30">30 Sec</option>
        <option value="60">60 Sec</option>
        <option value="90">90 Sec</option>
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleNext}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        Continue
      </button>
    </div>
  );
};

export default StepOne;
