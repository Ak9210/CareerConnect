//import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
//import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    //const jobId = "yrefuyefh";
    return (
        <div style={{ padding: '1.25rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', border: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p></p>
                <Button variant="outline" style={{ borderRadius: '9999px' }} size="icon"><Bookmark /></Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button style={{ padding: '1.5rem' }} variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 style={{ fontWeight: '500', fontSize: '1.125rem' }}>{job?.company?.name}</h1>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>India</p>
                </div>
            </div>

            <div>
                <h1 style={{ fontWeight: '500', fontSize: '1.125rem' }}>{job?.title}</h1>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{job?.description}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <Badge style={{ color: '#1D4ED8', fontWeight: 'bold' }} variant="ghost"> {job?.position} Positions</Badge>
                <Badge style={{ color: '#F83002', fontWeight: 'bold' }} variant="ghost">{job?.jobType}</Badge>
                <Badge style={{ color: '#7209b7', fontWeight: 'bold' }} variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button style={{ backgroundColor: '#7209b7' }}>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job;