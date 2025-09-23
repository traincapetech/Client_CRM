import { useState } from "react";
import "./Signup.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    organizationDomain: "",
  });

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
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Registeration successful:", data);
        alert("Registration successful! Please login.");
        // redirect to login page
        navigate("/login")
      } else {
        console.error("Signup error:", data);
        alert(`Signup failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error, please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <h1 className="logo">Register</h1>
        <p className="subtitle">
          Access and manage your documents and databases.
        </p>

        {/* Form */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

          <div className="form-group">
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="organizationDomain"
              placeholder="Organization Domain"
              value={formData.organizationDomain}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

    </div>
  );
};

export default Signup;
