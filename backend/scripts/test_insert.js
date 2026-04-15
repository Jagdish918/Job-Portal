import mongoose from "mongoose";
import dotenv from "dotenv";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";

dotenv.config();

const testInsert = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({role: 'recruiter'});
        
        console.log("Found user:", user ? user._id : "none");
        
        let c = await Company.create({
            name: "TestCompany",
            userId: user._id
        });
        
        console.log("Created successfully:", c);
        
        await Company.deleteOne({_id: c._id});
        
        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating company:");
        console.error(error);
        mongoose.connection.close();
    }
};

testInsert();
