export default function Login() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4 bg-white p-5 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/logo.png" alt="Green Biller" style={{ maxWidth: "180px" }} />
          </div>

          {/* Title */}
          <h3 className="fw-bold">Sign In</h3>
          <p className="text-muted">Access the Green Biller panel using your Mobile.</p>

          {/* Form */}
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" required />
            </div>

            <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#ff9933" }}>
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-3 text-center">
            <p className="mb-0">
              New on our platform? <a href="#" className="fw-bold text-decoration-none">Create an account</a>
            </p>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Social Logins */}
          <div className="d-flex gap-2">
            <button className="btn btn-primary w-100">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="btn btn-light border w-100">
              <i className="fab fa-google text-danger"></i>
            </button>
            <button className="btn btn-dark w-100">
              <i className="fab fa-apple"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
    