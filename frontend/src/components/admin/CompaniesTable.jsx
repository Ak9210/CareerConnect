import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company); // Default to empty array if undefined
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure companies is an array before trying to filter
        const filteredCompany = companies?.length > 0 ? companies.filter((company) => {
            // If searchCompanyByText is empty, show all companies
            if (!searchCompanyByText) {
                return true;
            }

            // Filter based on company name
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : [];

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]); // Run the effect when either companies or searchCompanyByText changes

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead style={{ textAlign: 'right' }}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo} alt={`${company.name} logo`} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell style={{ textAlign: 'right', cursor: 'pointer' }}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent style={{ width: '8rem' }}>
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', width: 'fit-content' }}
                                        >
                                            <Edit2 style={{ width: '1rem' }} />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;