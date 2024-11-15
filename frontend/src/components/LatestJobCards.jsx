//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            style={{
                padding: "1.25rem",
                borderRadius: "0.375rem",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                border: "1px solid #f3f4f6",
                cursor: "pointer"
            }}
        >
            <div>
                <h1 style={{ fontWeight: "500", fontSize: "1.125rem" }}>
                    {job?.company?.name}
                </h1>
                <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>India</p>
            </div>
            <div>
                <h1 style={{ fontWeight: "500", fontSize: "1.125rem" }}>
                    {job?.title}
                </h1>
                <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                    {job?.description}
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge style={{ color: "#1D4ED8", fontWeight: "bold" }} variant="ghost">
                    {job?.position}
                </Badge>
                <Badge style={{ color: '#F83002', fontWeight: 'bold' }} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge style={{ color: '#7209b7', fontWeight: 'bold' }} variant="ghost">
                    {job?.salary}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
