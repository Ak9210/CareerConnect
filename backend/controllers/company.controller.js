import Company from "../modles/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.userId// Use req.userId (set by the isAuthenticated middleware)
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.userId; // logged-in user id
        const companies = await Company.find({ userId });
        if (!companies.length) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false,
                error: "No companies found in the database." // Provide a custom error message
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; // Get the company ID from URL params

        // Check if the company exists
        const company = await Company.findById(companyId);

        if (!company) {
            // If company doesn't exist, return 404 with a relevant message
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        // Properly log the error and send a 500 status code
        console.error(error); // Log error details
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message // Return error message to the client
        });
    }
};

export const updateCompany = async (req, res) => {
    //const companyId = req.params.id;
    try {
        const { name, description, website, location } = req.body;

        let logo;
        const file = req.file;
        if (file) {
            // Uncomment the following lines when Cloudinary setup is ready
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location, logo };
        

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};