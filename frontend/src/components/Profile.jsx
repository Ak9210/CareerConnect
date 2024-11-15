import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useGetAppliedJobs from '@/hooks/useGetAppliedJob';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div style={{ backgroundColor: "#F3F4F6", minHeight: "100vh", padding: "2rem" }}>
            <Navbar />
            <div style={{
                maxWidth: "64rem",
                margin: "auto",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "1rem",
                padding: "2rem",
                marginTop: "2.5rem",
                marginBottom: "2.5rem",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        <Avatar style={{ height: "6rem", width: "6rem", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Chandigarh_University_Seal.png" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 style={{ fontWeight: "600", fontSize: "1.5rem" }}>{user?.fullname}</h1>
                            <p style={{ color: "#6B7280", marginTop: "0.25rem", fontSize: "0.875rem" }}>{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e5e7eb" }}>
                        <Pen /> Edit Profile
                    </Button>
                </div>
                
                <div style={{ marginBottom: "1.5rem", color: "#4B5563" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <Mail style={{ color: "#3B82F6" }} />
                        <span>{user?.email || 'No email available'}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <Contact style={{ color: "#3B82F6" }} />
                        <span>{user?.phoneNumber || 'No phone number available'}</span>
                    </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem" }}>Skills</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {user?.profile?.skills?.length
                            ? user.profile.skills.map((item, index) => (
                                <Badge key={index} style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>{item}</Badge>
                              ))
                            : <span style={{ color: "#6B7280" }}>No skills added</span>
                        }
                    </div>
                </div>

                <div style={{ display: "grid", gap: "0.375rem" }}>
                    <Label style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Resume</Label>
                    {isResume ? (
                        <a
                            target="_blank"
                            href={user?.profile?.resume}
                            style={{
                                color: "#2563EB",
                                cursor: "pointer",
                                textDecoration: "underline",
                                fontSize: "0.875rem"
                            }}
                        >
                            Download Resume
                        </a>
                    ) : (
                        <span style={{ color: "#6B7280" }}>No resume available</span>
                    )}
                </div>
            </div>

            <div style={{
                maxWidth: "64rem",
                margin: "auto",
                backgroundColor: "white",
                borderRadius: "1rem",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
                marginTop: "1.5rem"
            }}>
                <h1 style={{ fontWeight: "bold", fontSize: "1.125rem", marginBottom: "1rem" }}>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;