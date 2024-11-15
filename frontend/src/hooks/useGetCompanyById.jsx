import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        // Corrected API endpoint URL format
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });

        // Check the response and dispatch the data
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.error("Failed to fetch company:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching company:", error.message || error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);

  // Optionally, return the company data if needed
  // return companyData;
};

export default useGetCompanyById;