import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// Change .get() to .post() for the apply route
router.route("/apply/:id").post(isAuthenticated, applyJob);  // POST method to apply
router.route("/get").get(isAuthenticated, getAppliedJobs);  // GET method to get applied jobs
router.route("/:id/applicants").get(isAuthenticated, getApplicants);  // GET method to get applicants for a job
router.route("/status/:id/update").post(isAuthenticated, updateStatus);  // POST method to update application status

export default router;
