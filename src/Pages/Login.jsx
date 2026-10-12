
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await axios.post(
        "https://backendbinding-2-l0ng.onrender.com/api/auth/login",
        formData
      );

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Check your email and password."
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
          <span>New here?</span>
          <Link to="/signup" className="header-link">
            Create account
          </Link>
        </div>
      </header>

      <section className="auth-layout">
        <div className="brand-panel">
          <div className="panel-eyebrow">
            <span className="status-dot" />
            YOUR SHOPPING SPACE
          </div>

          <h1>
            Good finds.
            <br />
            <span>Welcome back.</span>
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
              <div className="form-kicker">WELCOME BACK</div>
              <h2>Sign in</h2>
              <p>Enter your account details.</p>
            </div>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
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
                <label htmlFor="login-password">Password</label>
                <div className="password-wrap">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
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
                {loading ? "Signing in..." : "Sign in"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="form-footer">
              <span>Don't have an account?</span>
              <Link to="/signup">Create account</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;

