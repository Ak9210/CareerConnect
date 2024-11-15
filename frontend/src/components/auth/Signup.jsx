//import React from 'react'

//mport { Form } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading,user} = useSelector(store=>store.auth);
  const navigate = useNavigate();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    if(input.file) {
        formData.append("file", input.file);
    }

    try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true, // Remove if not needed
        });
        
        if (res.data.success) {
            toast.success(res.data.message, {
                onClose: () => navigate("/login")
            });
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
};
useEffect(()=>{
  if(user){
      navigate("/");
  }
},)

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <form
          onSubmit={submitHandler}
          style={{
            width: "50%", // Equivalent to `w-1/2`
            border: "1px solid #e5e7eb", // Equivalent to `border-gray-200`
            borderRadius: "0.375rem", // Equivalent to `rounded-md`
            padding: "1rem", // Equivalent to `p-4`
            marginTop: "2.5rem", // Equivalent to `my-10`
            marginBottom: "2.5rem",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              margin: "9px",
              fontSize: "1.25rem",
              justifyContent: "center",
            }}
          >
            Sign Up
          </h1>
          <div style={{ margin: "1rem" }}>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="sharma"
            />
          </div>
          <div style={{ margin: "1rem" }}>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="sharma@gmail.com"
            />
          </div>
          <div style={{ margin: "1rem" }}>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="sharma"
            />
          </div>
          <div style={{ margin: "1rem" }}>
            <Label>Phone number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "between",
            }}
          >
            <RadioGroup
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4rem",
                margin: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  style={{ cursor: "pointer" }}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "1px",
                }}
              >
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  value="recruiter"
                  style={{ cursor: "pointer" }}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div style={{ display: "flex", alignItems: "center", gap: "6rem" }}>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {
    loading ? (
        <Button style={{ width: "100%", margin: "1rem 0" }}>
            <Loader2 style={{ marginRight: "0.5rem", height: "1rem", width: "1rem", animation: "spin 1s linear infinite" }} /> Please wait
        </Button>
    ) : (
        <Button type="submit" style={{ width: "100%", margin: "1rem 0" }}>Signup</Button>
    )
}
          <span style={{ fontSize: "0.875rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#2563EB" }}>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
