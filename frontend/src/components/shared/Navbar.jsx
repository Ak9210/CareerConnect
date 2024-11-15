import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1280px",
        padding: "1rem 2rem",
        margin: "0 auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
        Career<span style={{ color: "#F83002" }}>Connect</span>
      </h1>

      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          listStyle: "none",
          fontWeight: "500",
          color: "#555",
          fontSize: "1rem",
        }}
      >
        {user && user.role === "recruiter" ? (
          <>
            <li>
              <Link to="/admin/companies" style={{ textDecoration: "none", color: "#333" }}>Companies</Link>
            </li>
            <li>
              <Link to="/admin/jobs" style={{ textDecoration: "none", color: "#333" }}>Jobs</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "#333" }}>Home</Link>
            </li>
            <li>
              <Link to="/workshops" style={{ textDecoration: "none", color: "#333" }}>Workshop</Link>
            </li>
            <li>
              <Link to="/jobs" style={{ textDecoration: "none", color: "#333" }}>Jobs</Link>
            </li>
            <li>
              <Link to="/browse" style={{ textDecoration: "none", color: "#333" }}>Browse</Link>
            </li>
          </>
        )}
      </ul>

      {!user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/login">
            <Button variant="outline" style={{ border: "1px solid #333", color: "#333" }}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              style={{
                backgroundColor: "#3498db",
                color: "#ffffff",
                padding: "0.5rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c8ad4")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
            >
              Signup
            </Button>
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar style={{ cursor: "pointer", height: "40px", width: "40px" }}>
              <AvatarImage
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Chandigarh_University_Seal.png"
                alt="Profile Avatar"
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            style={{
              width: "250px",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Avatar style={{ height: "50px", width: "50px" }}>
                <AvatarImage
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Chandigarh_University_Seal.png"
                  alt="Profile Avatar"
                />
              </Avatar>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>{user?.fullname}</h4>
                <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{user?.profile?.bio}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              {user?.role === "student" && (
                <Link to="/profile" style={{ display: "flex", alignItems: "center", color: "#3498db", fontWeight: "bold", textDecoration: "none" }}>
                  <User2 style={{ marginRight: "0.5rem" }} />
                  View Profile
                </Link>
              )}
              <div
                onClick={logoutHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#3498db",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <LogOut style={{ marginRight: "0.5rem" }} />
                Logout
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default Navbar;