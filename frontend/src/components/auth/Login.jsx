import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoadingState] = useState(false); // for showing loading spinner
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!input.email || !input.password || !input.role) {
      toast.error("All fields are required");
      return false;
    }
    // Add additional validation (email format, password strength, etc.)
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; // Only submit if validation passes

    try {
      dispatch(setLoading(true));
      setLoadingState(true); // Show loading state
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoadingState(false); // Hide loading spinner
      dispatch(setLoading(false)); // Stop loading in redux
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <form onSubmit={submitHandler} style={{ width: "50%", border: "1px solid #e5e7eb", borderRadius: "0.375rem", padding: "1rem", marginTop: "2.5rem", marginBottom: "2.5rem" }}>
          <h1 style={{ fontWeight: "bold", margin: "9px", fontSize: "1.25rem", justifyContent: "center" }}>Login</h1>

          <div style={{ margin: "1rem" }}>
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="sharma@gmail.com" />
          </div>
          <div style={{ margin: "1rem" }}>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="sharma" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <RadioGroup style={{ display: "flex", alignItems: "center", gap: "4rem", margin: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} style={{ cursor: "pointer" }} />
                <Label htmlFor="r1">student</Label>
              </div>
              <div style={{ display: "flex", alignItems: "center", letterSpacing: "1px" }}>
                <Input type="radio" name="role" checked={input.role === "recruiter"} onChange={changeEventHandler} value="recruiter" style={{ cursor: "pointer" }} />
                <Label htmlFor="r2">recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" style={{ width: "100%", margin: "1rem 0" }}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <span style={{ fontSize: "0.875rem" }}>
            Dont have an account?{" "}
            <Link to="/signup" style={{ color: "#2563EB" }}>
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;