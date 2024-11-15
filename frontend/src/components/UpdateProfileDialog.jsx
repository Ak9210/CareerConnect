//import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
 import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }



    return (
        <div>
    <Dialog open={open}>
        <DialogContent style={{ maxWidth: "425px", margin: "0 auto" }} onInteractOutside={() => setOpen(false)}>
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div style={{ display: "grid", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="name" style={{ textAlign: "right" }}>Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                             value={input.fullname}
                            onChange={changeEventHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="email" style={{ textAlign: "right" }}>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="number" style={{ textAlign: "right" }}>Number</Label>
                        <Input
                            id="number"
                            name="number"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="bio" style={{ textAlign: "right" }}>Bio</Label>
                        <Input
                            id="bio"
                            name="bio"
                             value={input.bio}
                            onChange={changeEventHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="skills" style={{ textAlign: "right" }}>Skills</Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", gap: "1rem" }}>
                        <Label htmlFor="file" style={{ textAlign: "right" }}>Resume</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            
                            onChange={fileChangeHandler}
                            style={{ gridColumn: "span 3" }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    {
                        loading
                            ? <Button style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
                                <Loader2 style={{ marginRight: "0.5rem", height: "1rem", width: "1rem", animation: "spin 1s linear infinite" }} />
                                Please wait
                            </Button>
                            : <Button type="submit" style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>Update</Button>
                    }
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</div>
    )
}

export default UpdateProfileDialog