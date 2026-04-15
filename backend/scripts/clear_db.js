import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { Application } from "../models/application.model.js";
import { Notification } from "../models/notification.model.js";

dotenv.config();

const deleteDummyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("Deleting all Applications...");
        await Application.deleteMany({});
        
        console.log("Deleting all Notifications...");
        await Notification.deleteMany({});

        console.log("Deleting all Jobs...");
        await Job.deleteMany({});

        console.log("Deleting all Companies...");
        await Company.deleteMany({});

        console.log("All dummy data (Jobs, Companies, Applications, Notifications) has been deleted successfully!");
        
        mongoose.connection.close();
    } catch (error) {
        console.error("Error deleting data:", error);
        mongoose.connection.close();
    }
};

deleteDummyData();
