// src/pages/AdminLanding.jsx
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, hint }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
    <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    <div className="text-2xl font-bold mt-2">{value ?? "—"}</div>
    {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
  </div>
);

const AdminLanding = () => {
  const { url, token } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const [stats, setStats] = useState({ users: null, pending: null, services: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // optional endpoint; if you don't have it backend returns 404 and we ignore
        const res = await fetch(`${url}/api/admin/stats`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) throw new Error("no-stats");
        const data = await res.json();
        // expect { users: n, pendingApplications: n, services: n }
        setStats({
          users: data.users,
          pending: data.pendingApplications ?? data.pending ?? null,
          services: data.services,
        });
      } catch (err) {
        // graceful fallback: try other endpoints or ignore
        setStats((s) => s); // do nothing, cards will show placeholders
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      {showLogin && <AdminLogin setShowLogin={setShowLogin} />}

      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Admin — Local Services</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl">
            Manage provider applications, services and platform data. Login to continue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/applications")}
            className="px-4 py-2 bg-white/80 dark:bg-gray-700 text-gray-800 rounded-lg shadow hover:opacity-95"
          >
            View Applications
          </button>

          <button
            onClick={() => {
              // if token present assume logged in, otherwise show login
              if (token) navigate("/");
              else setShowLogin(true);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
          >
            {token ? "Open Admin" : "Admin Login"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total users" value={stats.users ?? (loading ? "…" : null)} hint="Registered users" />
          <StatCard title="Pending applications" value={stats.pending ?? (loading ? "…" : null)} hint="Providers waiting for review" />
          <StatCard title="Active services" value={stats.services ?? (loading ? "…" : null)} hint="Services published" />
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quick actions</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("/applications")} className="px-4 py-3 bg-blue-600 text-white rounded-lg">Go to Applications</button>
            <button onClick={() => navigate("/services")} className="px-4 py-3 bg-indigo-600 text-white rounded-lg">Go to Services</button>
            <button onClick={() => setShowLogin(true)} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 rounded-lg">Admin Login</button>
          </div>
        </section>

        <section className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This is the admin landing page — use the login button to sign in. If you want the landing to show additional info (recent activity, logs), tell me which backend endpoints are available and I will add them.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AdminLanding;
