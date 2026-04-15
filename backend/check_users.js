import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await User.countDocuments({ email: { $regex: /^u\d+@gmail\.com$/ } });
        const recruiters = await User.countDocuments({ email: { $regex: /^u\d+@gmail\.com$/ }, role: 'recruiter' });
        const students = await User.countDocuments({ email: { $regex: /^u\d+@gmail\.com$/ }, role: 'student' });
        
        console.log(`TOTAL DUMMY USERS FOUND: ${count}`);
        console.log(`RECRUITERS FOUND: ${recruiters}`);
        console.log(`STUDENTS FOUND: ${students}`);
        
        process.exit();
    } catch (error) {
        console.error("Check failed:", error);
        process.exit(1);
    }
};

checkUsers();
