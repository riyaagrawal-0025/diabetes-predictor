import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Predictpage() {
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        age:"",
        sex:"",
        bmi:"",
        bp:"",
        s1:"",
        s2:"",
        s3:"",
        s4:"",
        s5:"",
        s6:"",
    });
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const Result=Math.random()>0.5 ? "High Risk":"Low Risk";
        navigate("/result")
    };
  return (
    <div className="flex flex-col items-center py-12">
        <h2 className='text-3xl font-bold mb-6'>Predict Diabetes Risk</h2>
        <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4"
        >
            {Object.keys(formData).map((field)=>(
                <input
                key={field}
                type="number"
                name={field}
                value={formData[field]}
                placeholder={field.toUpperCase()}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500'
                required
                />
            ))}
            <button type="submit" className='w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700'>Predict</button>

        </form>
      
    </div>
  )
}

export default Predictpage
