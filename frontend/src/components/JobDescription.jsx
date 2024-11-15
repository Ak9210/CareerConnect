import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setsingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const { id: jobId } = useParams();
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setsingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            if (!jobId) {
                console.error("Job ID is undefined");
                return;
            }
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setsingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch]);

    return (
        <div>
        <Navbar />
        <div style={{ maxWidth: "70rem", margin: "2rem auto", padding: "2rem", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                
                    <h1 style={{ fontWeight: "600", fontSize: "1.75rem", color: "#1D4ED8" }}>{singleJob?.title}</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
                        <Badge style={{ backgroundColor: "#E0F2FE", color: "#1D4ED8", fontWeight: "500" }} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge style={{ backgroundColor: "#FFF3E0", color: "#FB923C", fontWeight: "500" }} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge style={{ backgroundColor: "#F3E8FF", color: "#7C3AED", fontWeight: "500" }} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button 
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied} 
                    style={{
                        borderRadius: '4px',
                        backgroundColor: isApplied ? '#E5E7EB' : '#3B82F6',
                        color: isApplied ? '#9CA3AF' : '#FFFFFF',
                        cursor: isApplied ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        padding: '0.75rem 1.5rem'
                    }}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <hr style={{ margin: "1.5rem 0", borderColor: "#E5E7EB" }} />
            <div style={{ lineHeight: "1.75", fontSize: "1rem", color: "#374151" }}>
                <h2 style={{ fontWeight: "500", fontSize: "1.125rem", color: "#111827", marginBottom: "1rem" }}>Job Description</h2>
                <p>{singleJob?.description}</p>
                <div style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: "6px", backgroundColor: "#F9FAFB", color: "#4B5563" }}>
                    <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Role Details</h3>
                    <p><strong>Role:</strong> <span style={{ color: "#374151" }}>{singleJob?.title}</span></p>
                    <p><strong>Location:</strong> <span style={{ color: "#374151" }}>{singleJob?.location}</span></p>
                    <p><strong>Experience:</strong> <span style={{ color: "#374151" }}>{singleJob?.experience} years</span></p>
                    <p><strong>Salary:</strong> <span style={{ color: "#374151" }}>{singleJob?.salary} LPA</span></p>
                    <p><strong>Total Applicants:</strong> <span style={{ color: "#374151" }}>{singleJob?.applications?.length || 0}</span></p>
                    <p><strong>Posted Date:</strong> <span style={{ color: "#374151" }}>{singleJob?.createdAt.split("T")[0]}</span></p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default JobDescription;