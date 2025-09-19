import { useState } from "react";
import "./Signup.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Link} from "react-router-dom"

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
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
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("User credentials:", formData);

    // Example: save in localStorage (temporary)
    localStorage.setItem("userData", JSON.stringify(formData));

    // TODO: send data to backend with fetch/axios
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <h1 className="logo">SignUp </h1>
        <p className="subtitle">
          Access and manage your documents and databases.
        </p>

        {/* Form */}
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

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
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


            <Link to={`/login`}>
          <button type="submit" className="btn">
            Sign Up
          </button></Link>
        </form>

        {/* Already have account */}
        
        <p className="footer-text">
          Already have an account? 
           <Link to={`/login`} className="login-link">
           Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
