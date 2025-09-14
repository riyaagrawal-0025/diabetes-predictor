import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const DiabetesContext = createContext();

export const DiabetesProvider = ({children}) =>{
    const {user} = useContext(AuthContext);
    const [predictions, setPredictions] = useState([]);
    const addPrediction  = async (data) =>{
        if(!user) return;

        const res= await axios('http://localhost:5000/api/diabetes/predict',{
            method:'POST',
            headers:{
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });
        const newPrediction = await res.json;
        setPredictions([...predictions, newPrediction]);
    };

    const fetchMyPredictions= async() =>{
        if(!user){
            return;
        }
        const res= await axios('http://localhost:5000/api/diabetes/:id',{
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        });

        const data = await res.json();
        setPredictions(data);
    };
    return(
        <DiabetesContext.Provider value={{predictions, addPrediction,  fetchMyPredictions}}>
            {children}
        </DiabetesContext.Provider>
    )
}