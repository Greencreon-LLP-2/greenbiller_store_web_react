import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ---- Mock API ----
    if (email === "test@example.com" && password === "123456") {
      // mock token
      const mockToken = "mock-jwt-token-123456";
      // mock user data
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "test@example.com",
        role: "Admin",
      };

      // Save to localStorage
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4 bg-white p-5 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src={logo} alt="Green Biller" style={{ maxWidth: "180px" }} />
          </div>

          {/* Title */}
          <h3 className="fw-bold">Sign In</h3>
          <p className="text-muted">
            Access the Green Biller panel using your Mobile.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: "#ff9933" }}
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-3 text-center">
            <p className="mb-0">
              New on our platform?{" "}
              <a href="#" className="fw-bold text-decoration-none">
                Create an account
              </a>
            </p>
          </div>

          {/* Divider */}
          {/* <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div> */}

          {/* Social Logins */}
          {/* <div className="d-flex gap-2">
            <button className="btn btn-primary w-100" type="button">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="btn btn-light border w-100" type="button">
              <i className="fab fa-google text-danger"></i>
            </button>
            <button className="btn btn-dark w-100" type="button">
              <i className="fab fa-apple"></i>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
