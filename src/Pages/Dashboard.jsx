
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/dashboard" className="wordmark">
          shopcart<span>.</span>
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Sign out <span aria-hidden="true">→</span>
        </button>
      </header>

      <section className="dashboard-main">
        <div className="dashboard-eyebrow">
          <span className="status-dot" />
          MY ACCOUNT
        </div>

        <h1>
          Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : " back"}.
        </h1>

        <p className="dashboard-subtitle">
          Your account details.
        </p>

        <article className="dashboard-card">
          <div className="dashboard-card-heading">PROFILE</div>

          <div className="profile-content">
            <div className="profile-avatar">
              {(user?.name || user?.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="profile-details">
              <h2>{user?.name || "Your account"}</h2>
              <p>{user?.email || "Account details unavailable"}</p>
            </div>

            <span className="account-status">Signed in</span>
          </div>
        </article>

        <button className="dashboard-logout-link" onClick={handleLogout}>
          Sign out <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
