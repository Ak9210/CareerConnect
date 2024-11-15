//import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div style={{ maxWidth: '80rem', margin: '5rem auto' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>
        <span style={{ color: '#6A38C2' }}>Latest & Top </span> Job Openings
    </h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Add your job cards here */}
    

                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs