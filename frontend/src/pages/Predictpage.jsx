import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FIELDS = [
  {
    name: "age",
    label: "Age",
    placeholder: "Enter age in years",
    helper: "Example: 35",
  },
  {
    name: "sex",
    label: "Sex",
    placeholder: "0 = Female, 1 = Male",
    helper: "Use 0 for female, 1 for male",
  },
  {
    name: "bmi",
    label: "BMI (Body Mass Index)",
    placeholder: "e.g. 25.3",
    helper: "Weight (kg) / Height² (m²)",
  },
  {
    name: "bp",
    label: "Blood Pressure (BP)",
    placeholder: "Normalized BP value",
    helper: "Use the scaled BP value from dataset",
  },
  {
    name: "s1",
    label: "S1 – Total Serum Cholesterol",
    placeholder: "Normalized total cholesterol",
    helper: "Higher values usually mean higher cholesterol",
  },
  {
    name: "s2",
    label: "S2 – Low-Density Lipoproteins (LDL)",
    placeholder: "Normalized LDL value",
    helper: "‘Bad’ cholesterol – higher can be risky",
  },
  {
    name: "s3",
    label: "S3 – High-Density Lipoproteins (HDL)",
    placeholder: "Normalized HDL value",
    helper: "‘Good’ cholesterol – higher is usually better",
  },
  {
    name: "s4",
    label: "S4 – TCH / HDL Ratio",
    placeholder: "Normalized chol/HDL ratio",
    helper: "Higher ratio can indicate higher risk",
  },
  {
    name: "s5",
    label: "S5 – Log of Serum Triglycerides",
    placeholder: "Normalized log(triglycerides)",
    helper: "Related to blood fat levels",
  },
  {
    name: "s6",
    label: "S6 – Blood Sugar (Glucose)",
    placeholder: "Normalized blood sugar value",
    helper: "Higher values may indicate risk",
  },
];

function Predictpage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    bmi: "",
    bp: "",
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
    s6: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --------------------
  // Handle Input Change
  // --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // --------------------
  // Simple Validation
  // --------------------
  const validate = () => {
    const newErrors = {};

    FIELDS.forEach((field) => {
      const value = formData[field.name];

      if (value === "" || value === null || value === undefined) {
        newErrors[field.name] = "This field is required";
      } else if (isNaN(Number(value))) {
        newErrors[field.name] = "Please enter a valid number";
      }
    });

    return newErrors;
  };

  // --------------------
  // Handle Submit
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const numericPayload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );

      const res = await fetch("http://localhost:5000/api/diabetes/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If you're using JWT auth, ALSO add:
          // Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify(numericPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Prediction error:", data);
        alert(data.message || "Something went wrong!");
        return;
      }

      // Navigate to result page with prediction data
      navigate("/result", { state: data });
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to connect with server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
              Diabetes Risk Predictor
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fill in your health details below to get an estimated diabetes
              risk prediction. All values are based on the standardized dataset
              used to train the model.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              ML Model: Logistic Regression
            </span>
            <span className="mt-1 text-[11px] text-gray-400">
              *This is an AI-based estimate, not a medical diagnosis.
            </span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIELDS.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                </label>

                <input
                  id={field.name}
                  type="number"
                  step="any"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all
                    ${
                      errors[field.name]
                        ? "border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-300"
                        : "border-gray-200 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    }
                  `}
                />

                {/* Helper text */}
                <p className="mt-1 text-xs text-gray-400">{field.helper}</p>

                {/* Error text */}
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom section: Submit button + small note */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
            <p className="text-xs text-gray-500 max-w-md">
              Double-check your values before submitting. Extremely unusual or
              incorrect inputs can lead to unreliable predictions.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold
                text-white shadow-lg shadow-emerald-300/40
                transition-all duration-200
                ${
                  loading
                    ? "bg-emerald-400 cursor-not-allowed opacity-80"
                    : "bg-emerald-500 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95"
                }
              `}
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Predicting...
                </>
              ) : (
                "Predict Diabetes Risk"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Predictpage;
