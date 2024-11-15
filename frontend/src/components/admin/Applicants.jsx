import  { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants = []} = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id]);

    // Inline styles
    const containerStyle = {
        maxWidth: '1120px', // equivalent to 'max-w-7xl'
        margin: '0 auto'
    };

    const headingStyle = {
        fontWeight: 'bold',
        fontSize: '1.25rem', // equivalent to 'text-xl'
        margin: '1.25rem 0'
    };

    return (
        <div>
            <Navbar />
            <div style={containerStyle}>
                <h1 style={headingStyle}>
                    Applicants {applicants?.applications?.length}
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
}

export default Applicants;