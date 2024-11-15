// import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import Job from './Job';
//import Jobs from './Jobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useEffect } from 'react';

//const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "1120px", margin: "40px auto" }}>
    <h1 style={{ fontWeight: "bold", fontSize: "1.25rem", margin: "40px 0" }}>Search Results ({allJobs.length})</h1>
    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem"}}>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>);
})
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse