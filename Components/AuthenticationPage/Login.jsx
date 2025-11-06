import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        // store token in localStorage or context
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/home"); // redirect to home page
      } else {
        console.error("❌ Login failed:", data);
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error, please try again later.");
    }
  };


  return (
    <div className="container">
      <div className="card">
        <h1 className="logo">Login</h1>
        <p className="subtitle">Welcome back! Please login to continue.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
              >
                {showPassword ? <VisibilityOffIcon sx={{ color: "#212121" }} /> : <VisibilityIcon sx={{ color: "#212121" }} />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Organization Domain</label>
            <input
              type="text"
              name="organizationDomain"
              placeholder="Organization Domain"
              value={formData.organizationDomain}
              onChange={handleChange}
            />
          </div>
       
            <button type="submit" className="btn">
              Login
            </button>
          

        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <Link to="/" className="login-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
