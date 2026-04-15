import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

dotenv.config();

const testApi = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({role: 'recruiter'});
        
        if (!user) {
            console.log("No recruiter user found!");
            process.exit(0);
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        const res = await fetch("http://localhost:8000/api/v1/company/register", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Cookie: `token=${token};` 
            },
            body: JSON.stringify({ companyName: "ApiTestCompanyFetch" })
        });

        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", data);

        await mongoose.connection.close();
    } catch (error) {
        console.error("API Error Response:", error.message);
        await mongoose.connection.close();
    }
};

testApi();
