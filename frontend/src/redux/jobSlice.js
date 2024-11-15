import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs:[],
        singleJob:[],
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery: "", // Add searchedQuery to track search input
    },
    reducers: {
        // Set all jobs
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },

        setsingleJob: (state, action) => {
            console.log("Payload in setsingleJob:", action.payload); 
            state.singleJob = action.payload;
        },
        // Set searched query (for searching/filtering jobs)
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
    }
});

export const {
    setAllJobs, 
    setAllAdminJobs,
    setsingleJob,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery // Export the setSearchedQuery action
} = jobSlice.actions;

export default jobSlice.reducer;
