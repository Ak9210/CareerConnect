import { Job } from '../modles/job.model.js';
import mongoose from 'mongoose'; // Add this line at the top



// Admin posts a job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }
        
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: req.userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            // message: "Failed to create job.",
             message: "Job creation failed", error: error.message,
            success: false
        });
        //console.log(error.message);
    }
};

// Student gets all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to retrieve job.", error: error.message,
            success: false,
        });
    }
};

// Student gets job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        console.log('Received jobId:', jobId); 
        // Log the received jobId

        // Validate if the jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID format.",
                success: false,
            });
        }

        // Fetch the job by ID
        const job = await Job.findById(jobId).populate({
            path: "applications", // Populate the applications field
            select: "applicantName" // Select applicantName
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({
            message: "Failed to retrieve job.",
            error: error.message,
            success: false,
        });
    }
    
};


// Admin retrieves jobs they've created
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId;
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to retrieve admin jobs.",
            success: false
        });
    }
};