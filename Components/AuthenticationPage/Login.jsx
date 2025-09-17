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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy check (replace with API/database check later)
    if (formData.email === "test@example.com" && formData.password === "123456") {
      console.log("✅ Login success");
      navigate("/"); // go to Homepage
    } else {
      alert("❌ Invalid email or password");
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
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
          </div>
    <Link to={"/home"}>
          <button type="submit" className="btn">
            Login
          </button>
        </Link>
        
        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="login-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
