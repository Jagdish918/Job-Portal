import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { registerSchema, loginSchema } from "../utils/validation.js";

export const register = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0].message,
                success: false
            });
        }
        const { fullname, email, phoneNumber, password, role } = validation.data;
        const file = req.file;
        let profilePhoto = "";
        
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: profilePhoto,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        console.log("LOGIN ATTEMPT STARTED:", req.body.email);
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            console.log("VALIDATION FAILED:", validation.error.format());
            const errorMessage = validation.error.issues?.[0]?.message || "Input Validation Error";
            return res.status(400).json({
                message: errorMessage,
                success: false
            });
        }
        const { email, password, role } = validation.data;
        let user = await User.findOne({ email });
        if (!user) {
            console.log("USER NOT FOUND:", email);
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        console.log("USER FOUND, COMPARING PASSWORD...");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("PASSWORD MISMATCH");
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            console.log("ROLE MISMATCH:", role, "vs", user.role);
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        console.log("AUTHENTICATED, GENERATING TOKEN...");
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        console.log("LOGIN SUCCESSFUL, SENDING RESPONSE...");
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log("LOGOUT ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getallusers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({
            users,
            success: true,
            count: users.length
        });
    } catch (error) {
        console.log("GET ALL USERS ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        // Updating basic data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        
        if(skills){
            user.profile.skills = skills.split(",");
        }

        // Handle File Uploads (Resume & Profile Photo)
        const resumeFile = req.files?.file?.[0]; 
        const profilePhotoFile = req.files?.profilePhoto?.[0]; 

        if (resumeFile) {
            const fileUri = getDataUri(resumeFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        if (profilePhotoFile) {
            const fileUri = getDataUri(profilePhotoFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}