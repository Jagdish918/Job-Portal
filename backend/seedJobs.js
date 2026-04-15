import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Job Seeding...");

        // Find recruiters (u25 to u50)
        const recruiters = await User.find({ email: { $regex: /^u(2[5-9]|[3-4][0-9]|50)@gmail\.com$/ } });
        if (recruiters.length === 0) {
            console.log("No recruiter users found. Run seed.js first.");
            process.exit();
        }

        // Cleanup existing dummy jobs and companies
        await Job.deleteMany({ title: { $regex: /Dummy/i } });
        await Company.deleteMany({ name: { $regex: /Enterprise/i } });

        const titles = ["Frontend Developer", "Backend Developer", "Full Stack Engineer", "UI/UX Designer", "DevOps Engineer", "Project Manager", "Data Scientist", "Mobile App Developer"];
        const locations = ["Remote", "Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Gurugram", "Ahmedabad"];
        const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];

        for (let i = 0; i < recruiters.length; i++) {
            const recruiter = recruiters[i];
            
            // Create a unique company for this recruiter
            const company = await Company.create({
                name: `Enterprise ${i + 1} Corp`,
                description: `A subsidiary of Global Innovations led by ${recruiter.fullname}.`,
                website: `https://ent${i+1}.com`,
                location: locations[i % locations.length],
                userId: recruiter._id,
                logo: "https://via.placeholder.com/150"
            });

            // Create 2 jobs for each recruiter
            for (let j = 1; j <= 2; j++) {
                await Job.create({
                    title: `Dummy ${titles[(i + j) % titles.length]}`,
                    description: `Exciting opportunity for a ${titles[(i + j) % titles.length]} at ${company.name}. You will work on high-impact cloud architectures.`,
                    requirements: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
                    salary: 10 + (i % 20) + j,
                    experienceLevel: (i % 5) + 1,
                    location: company.location,
                    jobType: jobTypes[(i + j) % jobTypes.length],
                    position: j + 2,
                    company: company._id,
                    created_by: recruiter._id
                });
            }
        }

        console.log(`Successfully created ${recruiters.length} dummy companies and ${recruiters.length * 2} dummy jobs!`);
        process.exit();
    } catch (error) {
        console.error("Job Seeding failed:", error);
        process.exit(1);
    }
};

seedJobs();
