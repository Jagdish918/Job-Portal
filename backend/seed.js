import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding...");

        // Clear existing dummy users to avoid duplication
        await User.deleteMany({ email: { $regex: /^u\d+@gmail\.com$/ } });
        console.log("Cleaned up old dummy users.");

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const users = [];

        for (let i = 1; i <= 50; i++) {
            const role = i >= 25 ? "recruiter" : "student";
            users.push({
                fullname: `User ${i}`,
                email: `u${i}@gmail.com`,
                phoneNumber: 9999999000 + i,
                password: hashedPassword,
                role: role,
                profile: {
                    bio: `I am user ${i}, a passionate ${role}.`,
                    skills: role === "student" ? ["HTML", "CSS", "React"] : [],
                }
            });
        }

        await User.insertMany(users);
        console.log("Successfully created 50 dummy users!");
        
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedUsers();
