import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const Result = Math.random() > 0.5 ? "High Risk" : "Low Risk";
        navigate("/result")
    };

    return (
        <div className="flex flex-col items-center py-12 mx-8">
            <h2 className='text-3xl font-bold mb-4'>Predict Diabetes Risk</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white grid grid-cols-3 gap-4 w-full"
            >
                {Object.keys(formData).map((field) => (
                    <input
                        key={field}
                        type="number"
                        name={field}
                        value={formData[field]}
                        placeholder={field.toUpperCase()}
                        onChange={handleChange}
                        className='w-full p-3 border-2 border-neutral-400 rounded-lg focus:ring-2 focus:ring-teal-500'
                        required
                    />
                ))}
            </form>
            <button type="submit" className='w-fit p-4 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700'>Predict</button>

        </div>
    )
}

export default Predictpage
