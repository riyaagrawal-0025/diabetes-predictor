import express from "express";
import Diabetes from "../models/diabetes.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router= express.Router();

router.get('/', authMiddleware, async (req,res) =>{
    try {
        const email=req.email;
        const records = await Diabetes.find({email});
        res.status(200).json({message: "User's diabetes records fetched", records})
    } catch (error) {
        console.error("Error fetching user records:", error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
});

export default router;