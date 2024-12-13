'use client';

import { useState } from 'react';

interface FormData {
  age: number;
  hypertension: number;
  heart_disease: number;
  avg_glucose_level: number;
  bmi: number;
  gender: string;
  ever_married: string;
  work_type: string;
  Residence_type: string;
  smoking_status: string;
}

export default function Prediction() {
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    hypertension: 0,
    heart_disease: 0,
    avg_glucose_level: 0,
    bmi: 0,
    gender: 'Male',
    ever_married: 'No',
    work_type: 'Private',
    Residence_type: 'Urban',
    smoking_status: 'Never_smoked',
  });

  const [result, setResult] = useState<{
    prediction: number;
    probability: number;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='p-6 m-5 bg-green-50 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-6 text-green-800'>
        Stroke Risk Prediction
      </h1>
      <form className='space-y-6' onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className='flex flex-col mb-4'>
            <label
              htmlFor={key}
              className='text-sm font-semibold text-gray-700 capitalize'
            >
              {key.replace('_', ' ')}
            </label>
            {key === 'gender' ||
            key === 'ever_married' ||
            key === 'work_type' ||
            key === 'Residence_type' ||
            key === 'smoking_status' ? (
              <select
                name={key}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
                className='border p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300'
              >
                {key === 'gender' && (
                  <>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </>
                )}
                {key === 'ever_married' && (
                  <>
                    <option value='No'>No</option>
                    <option value='Yes'>Yes</option>
                  </>
                )}
                {key === 'work_type' && (
                  <>
                    <option value='Private'>Private</option>
                    <option value='Self-employed'>Self-employed</option>
                    <option value='Govt_job'>Govt_job</option>
                    <option value='children'>Children</option>
                  </>
                )}
                {key === 'Residence_type' && (
                  <>
                    <option value='Urban'>Urban</option>
                    <option value='Rural'>Rural</option>
                  </>
                )}
                {key === 'smoking_status' && (
                  <>
                    <option value='Never_smoked'>Never_smoked</option>
                    <option value='Smokes'>Smokes</option>
                    <option value='Formerly_smoked'>Formerly_smoked</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={
                  typeof formData[key as keyof FormData] === 'number'
                    ? 'number'
                    : 'text'
                }
                name={key}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
                className='border p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300'
              />
            )}
          </div>
        ))}
        <button
          type='submit'
          className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300'
        >
          Predict
        </button>
      </form>

      {result && (
        <div className='mt-6 p-4 bg-green-100 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold text-green-800'>Result:</h2>
          <p className='text-lg text-green-700'>
            Stroke: {result.prediction ? 'Yes' : 'No'}
          </p>
          <p className='text-lg text-green-700'>
            Probability: {result.probability}
          </p>
        </div>
      )}
    </div>
  );
}
