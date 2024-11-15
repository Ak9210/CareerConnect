import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false); // To manage button loading state
    const dispatch = useDispatch();

    // Register new company function
    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name');
            return;
        }

        setLoading(true); // Disable button and show loading state

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error(res?.data?.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to register the company. Please try again.');
        } finally {
            setLoading(false); // Re-enable button after request is done
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
                <div style={{ margin: '2.5rem 0' }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Your Company Name</h1>
                    <p style={{ color: '#6B7280' }}>
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    style={{ margin: '0.5rem 0' }}
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '2.5rem 0' }}>
                    <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany} disabled={loading}>
                        {loading ? 'Creating...' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;