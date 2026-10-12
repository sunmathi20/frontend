
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://backendbinding-2-l0ng.onrender.com/api/auth/signup",
        formData
      );

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <header className="site-header">
        <Link to="/login" className="wordmark">
          shopcart<span>.</span>
        </Link>

        <div className="header-action">
          <span>Already registered?</span>
          <Link to="/login" className="header-link">
            Sign in
          </Link>
        </div>
      </header>

      <section className="auth-layout">
        <div className="brand-panel">
          <div className="panel-eyebrow">
            <span className="status-dot" />
            SHOP SMARTER
          </div>

          <h1>
            Your next
            <br />
            <span>great find.</span>
          </h1>

          <div className="shopping-art" aria-hidden="true">
            <div className="art-circle circle-back" />
            <div className="art-circle circle-front" />
            <div className="art-bag">
              <div className="bag-handle" />
              <div className="bag-body">
                <div className="bag-fold" />
              </div>
              <div className="bag-mark" />
            </div>
            <div className="art-spark spark-one" />
            <div className="art-spark spark-two" />
            <div className="art-spark spark-three" />
          </div>
        </div>

        <div className="form-side">
          <div className="auth-card">
            <div className="form-top">
              <div className="form-kicker">GET STARTED</div>
              <h2>Create account</h2>
              <p>Enter your details below.</p>
            </div>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="signup-name">Full name</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="signup-password">Password</label>
                <div className="password-wrap">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />

                  <button
                    className="show-password"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                className="primary-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="form-footer">
              <span>Already have an account?</span>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;

