import express from "express";
import Diabetes from "../models/diabetes.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router= express.Router();

router.post("/predict", authMiddleware, async(req,res)=>{
    try {
        const {age, sex,bmi,bp,s1,s2,s3,s4,s5,s6}=req.body;
        const predictions = new Diabetes({
            user:req.user.id,
            age, 
            sex,
            bmi,
            bp,
            s1,
            s2,
            s3,
            s4,
            s5,
            s6
        });
        await predictions.save();
        res.status(201).json(prediction);
    } catch (error) {
        res.status(500).json({message: "Error saving prediction", error: error.message});
    }
});

router.get('/', authMiddleware, async (req,res) =>{
    try {
        const records = await Diabetes.find({user:req.user.id});
        res.status(200).json({message: "User's diabetes records fetched", records})
    } catch (error) {
        console.error("Error fetching user records:", error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
});

router.get('/:id', authMiddleware, async(req,res)=>{
    try {
        const myPredictions = await Diabetes.find({user:req.user.id});
        if(!myPredictions) {
            return res.status(404).json({message: "Record not found."})
        }
        res.json(myPredictions);
    } catch (error) {
        res.status(500).json({message: "Error fetching your predictions"});
    }
})

export default router;