import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No result found. Please try again.</p>
      </div>
    );
  }

  const { prediction, probability } = state;

  
  const percentage = Math.round(probability * 100);

  
  let riskLabel = "";
  let riskColor = "";

  if (percentage < 40) {
    riskLabel = "Low Risk";
    riskColor = "text-green-600";
  } else if (percentage < 70) {
    riskLabel = "Moderate Risk";
    riskColor = "text-yellow-600";
  } else {
    riskLabel = "High Risk";
    riskColor = "text-red-600";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10">
      <div className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn">

        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Diabetes Risk Analysis
        </h1>

       
        <div className="flex justify-center mb-10">
          <div className="relative w-48 h-48">
          
            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>

            
            <div
              className="absolute inset-0 rounded-full border-8 border-teal-500 border-t-transparent border-l-transparent"
              style={{
                transform: `rotate(${percentage * 1.8}deg)`,
                transition: "1.2s ease",
              }}
            ></div>

            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-3xl font-bold ${riskColor}`}>{percentage}%</p>
              <p className="text-gray-500 text-sm tracking-wide">{riskLabel}</p>
            </div>
          </div>
        </div>

   
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">
            Prediction Summary
          </h2>

          <p className="text-gray-600 text-center leading-relaxed">
            According to the AI model, your estimated risk of diabetes is{" "}
            <span className={`font-semibold ${riskColor}`}>
              {riskLabel.toUpperCase()}
            </span>
            , with a prediction confidence of{" "}
            <span className="font-semibold text-teal-600">
              {percentage}%
            </span>.
          </p>
        </div>

        
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 mb-6">
          ⚠️ <span className="font-semibold">Note:</span> This prediction is
          based on machine learning and standardized medical indicators. It is
          not a medical diagnosis. Consult a healthcare professional for
          accurate health assessment.
        </div>

        
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/predict")}
            className="px-8 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
          >
            Try Again
          </button>
        </div>

      </div>
    </div>
  );
}

export default Result;
