import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/diabetes/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                Object.fromEntries(
                Object.entries(formData).map(([k, v]) => [k, Number(v)])
            )
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Prediction error:", data);
        alert("Something went wrong!");
        return;
      }

      // Save result to navigate with state
      navigate("/result", { state: data });

    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to connect with server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 mx-8">
      <h2 className="text-3xl font-bold mb-6">Predict Diabetes Risk</h2>

      {/* FORM START */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-3 gap-4 w-full max-w-5xl"
      >
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            value={formData[field]}
            placeholder={field.toUpperCase()}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
        ))}

        <div className="col-span-3 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>
      {/* FORM END */}
    </div>
  );
}

export default Predictpage;
