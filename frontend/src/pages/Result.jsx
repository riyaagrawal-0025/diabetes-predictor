import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  // If user opens /result manually => redirect back
  if (!data) {
    return (
      <div className="text-center p-10">
        <h2>No Result Found</h2>
        <button
          onClick={() => navigate("/predict")}
          className="bg-teal-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-teal-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { prediction, probability } = data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Prediction Result
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          {prediction === 1
            ? "⚠️ High Risk of Diabetes"
            : "✅ Low Risk of Diabetes"}
        </p>

        {probability !== undefined && (
          <p className="text-md text-gray-500 mb-6">
            Probability: {(probability * 100).toFixed(2)}%
          </p>
        )}

        <button
          onClick={() => navigate("/predict")}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Result;
