//import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'


const AppliedJobTable = () => {
    const {allAppliedJobs = []} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead style={{textAlign:"right"}}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
    {allAppliedJobs.length <= 0 ? (
        <TableRow>
            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                You havent applied for any jobs yet.
            </TableCell>
        </TableRow>
    ) : (
        allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell style={{ textAlign: 'right' }}>
                    <Badge
                        style={{
                            backgroundColor:
                                appliedJob?.status === "rejected"
                                    ? '#f87171'
                                    : appliedJob.status === 'pending'
                                    ? '#9ca3af'
                                    : '#4ade80',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            color: 'white',
                        }}
                    >
                        {appliedJob.status?.toUpperCase() || 'UNKNOWN'}
                    </Badge>
                </TableCell>
            </TableRow>
        ))
    )}
</TableBody>

            </Table>
        </div>
    )
}

export default AppliedJobTable